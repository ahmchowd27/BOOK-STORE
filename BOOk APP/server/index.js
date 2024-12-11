const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI with TLS enabled
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

    // Define routes here
    app.get("/", (req, res) => res.send("Hello World!"));

    app.post("/upload-book", async (req, res) => {
      const result = await bookCollections.insertOne(req.body);
      res.send(result);
    });

    app.get("/all-books", async (req, res) => {
      const books = await bookCollections.find().toArray();
      res.send(books);
    });

    app.get("/book/:id", async (req, res) => {
      const book = await bookCollections.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(book);
    });

    app.patch("/book/:id", async (req, res) => {
      const result = await bookCollections.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { upsert: true }
      );
      res.send(result);
    });

    app.delete("/book/:id", async (req, res) => {
      const result = await bookCollections.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
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
