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
  "mongodb+srv://ahmedssofa:fPPUY7JHJc1uQKYk@cluster0.oyxdq.mongodb.net/?retryWrites=true&tls=true";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
  tls: true,
  tlsAllowInvalidCertificates: true, // Allow invalid TLS certificates for development
});

async function run() {
  try {
    await client.connect();
    const bookCollections = client.db("BookInventory").collection("Books");

    // Routes
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    app.get("/all-books", async (req, res) => {
      const books = await bookCollections.find().toArray();
      res.send(books);
    });

    // Other endpoints...

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
