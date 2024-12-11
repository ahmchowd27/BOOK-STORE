const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// MongoDB Configuration
const uri =
  "mongodb+srv://ahmedssofa:fPPUY7JHJc1uQKYk@cluster0.oyxdq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: true, // Allow invalid TLS certificates
});

async function run() {
  try {
    await client.connect();
    const bookCollections = client.db("BookInventory").collection("Books");

    // Insert a Book
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    // Search Book by Title
    app.get("/search-book", async (req, res) => {
      const searchQuery = req.query.title.trim();
      try {
        const result = await bookCollections
          .find({ title: { $regex: searchQuery, $options: "i" } })
          .toArray();

        if (result.length > 0) {
          res.send(result);
        } else {
          res
            .status(404)
            .send({ message: "No books found matching the title" });
        }
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error searching for books", error: error.message });
      }
    });

    // Get All Books
    app.get("/all-books", async (req, res) => {
      const query = req.query?.category ? { category: req.query.category } : {};
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    // Get Top Books
    app.get("/top-books", async (req, res) => {
      try {
        const result = await bookCollections
          .aggregate([{ $sample: { size: 10 } }])
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching random books:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // Update a Book
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = { $set: { ...updateBookData } };
      const options = { upsert: true };

      const result = await bookCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // Delete a Book
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    // Get a Single Book by ID
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    });

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
