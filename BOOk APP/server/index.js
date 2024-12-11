const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middlewear
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// mongodb confiq here
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://ahmedssofa:fPPUY7JHJc1uQKYk@cluster0.oyxdq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const bookCollections = client.db("BookInventory").collection("Books");

    // insert a book to db: Post Method
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });
    app.get("/search-book", async (req, res) => {
      const searchQuery = req.query.title.trim(); // Ensure there are no extra spaces
      console.log("Search query:", searchQuery); // Log the query for debugging

      try {
        // Perform a case-insensitive search using a regular expression
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

    // // get all books from db
    // app.get("/all-books", async (req, res) => {
    //     const books = bookCollections.find();
    //     const result = await books.toArray();
    //     res.send(result)
    // })

    // get all books & find by a category from db
    app.get("/all-books", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    app.get("/top-books", async (req, res) => {
      try {
        const result = await bookCollections
          .aggregate([{ $sample: { size: 10 } }])
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching random books: ", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // update a books method
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          ...updateBookData,
        },
      };
      const options = { upsert: true };

      // update now
      const result = await bookCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // delete a item from db
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    // get a single book data
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
