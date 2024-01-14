const express = require("express");
const { chats } = require("./data/data");  //connecting to static data in "data" folder.

const helmet = require("helmet");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middleware/errorHandler');

require("dotenv").config();
connectDB();
const app = express();

//app.use(helmet());
//app.use(cors());
app.use(express.json());  //to accept JSON data

const uri = process.env.MONGO_URI; // Add your connection string from Atlas to your .env file. See https://docs.atlas.mongodb.com/getting-started/
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect((err) => {
  MongoClient
  if (err) {
    console.error("Error connecting to MongoDB", err);
    return;
  }
  console.log("Connected to MongoDB");
  client.close();
});

app.get(`/`, (req, res) => {
  res.send("API is running");
});


app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);   //not found 
app.use(errorHandler); // Error Handling.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
