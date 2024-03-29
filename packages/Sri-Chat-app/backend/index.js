const express = require("express");
const { chats } = require("./data/data");  //connecting to static data in "data" folder.

const helmet = require("helmet");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require('./middleware/errorHandler');
const path = require("path");
const PORT = process.env.PORT || 5000;
const ENDPOINT = process.env.REACT_APP_API_URL;

require("dotenv").config();
connectDB();
const app = express();

const http = require('http').Server(app);
//const cors = require('cors');

//app.use(helmet());
app.use(cors());
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
  res.send("API is running Successfully");
});


app.use(`/api/user`, require("./routes/userRoutes"));
app.use(`/api/chat`, require("./routes/chatRoutes"));
app.use(`/api/message`, require("./routes/messageRoutes"));

//socket.io server-client connection.
const server = app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
const io = require("socket.io")(server, {
  pingTimeout: 50000,
  cors: {
    //origin: "http://localhost:3000",
    origin: "https://sri-chat-app-frontend-static.onrender.com",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");


  /*----Deployment--------*/

  /* const __dirname1 = path.resolve();
 
   if (process.env.NODE_ENV === "production") {
     app.use(express.static(path.join(__dirname1, "https://sri-chat-app-frontend-static.onrender.com")));
 
     app.get("*", (req, res) =>
       res.sendFile(path.resolve(__dirname1, `https://sri-chat-app-frontend-static.onrender.com/build/index.html`))
     );
   } else {
     app.get("https://sri-chat-app-frontend-static.onrender.com/api", (req, res) => {
       res.send("API is running successfully..");
     });
   }
   ;*/


  /*------------------*/
  app.use(notFound);   //not found 
  app.use(errorHandler); // Error Handling.






  //creating socket to send data from frontend to the chat .
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");

  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room:" + room);
  })

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach(user => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
