const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// MongoDB URI
const uri =
  "mongodb+srv://ahmedssofa:fPPUY7JHJc1uQKYk@cluster0.oyxdq.mongodb.net/?retryWrites=true&w=majority&tls=true";

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB and define routes
async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const bookCollections = client.db("BookInventory").collection("Books");

    // Root Route
    app.get("/", (req, res) => {
      res.send("Hello World! Backend is running.");
    });

    // Upload Book Route
    app.post("/upload-book", async (req, res) => {
      try {
        const result = await bookCollections.insertOne(req.body);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error uploading book:", error);
        res.status(500).send({ error: "Failed to upload book." });
      }
    });

    // Get All Books Route
    app.get("/all-books", async (req, res) => {
      try {
        const books = await bookCollections.find().toArray();
        res.send(books);
      } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send({ error: "Failed to fetch books." });
      }
    });

    // Get Single Book by ID
    app.get("/book/:id", async (req, res) => {
      try {
        const book = await bookCollections.findOne({
          _id: new ObjectId(req.params.id),
        });
        if (book) {
          res.send(book);
        } else {
          res.status(404).send({ error: "Book not found." });
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).send({ error: "Failed to fetch book." });
      }
    });

    // Update Book by ID
    app.patch("/book/:id", async (req, res) => {
      try {
        const result = await bookCollections.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body },
          { upsert: true }
        );
        res.send(result);
      } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send({ error: "Failed to update book." });
      }
    });

    // Delete Book by ID
    app.delete("/book/:id", async (req, res) => {
      try {
        const result = await bookCollections.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        if (result.deletedCount > 0) {
          res.send({ message: "Book deleted successfully." });
        } else {
          res.status(404).send({ error: "Book not found." });
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({ error: "Failed to delete book." });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    process.on("SIGINT", async () => {
      await client.close();
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  }
}

run().catch(console.dir);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
