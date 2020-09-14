const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv/config");
const Message = require("./models/messageModel");

const { createUniqueID } = require("./utils/create-unique-id");

const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
const io = socketio(server);

const botName = "Friendcord Bot";

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Import Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const chatsRoutes = require("./routes/chatsRoutes");
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/chats", chatsRoutes);

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("connected to DB")
);

// Send all requests to index.html`
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"), function (
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

io.on("connection", (socket) => {
  console.log("New connection");
  socket.emit("connection", "Welcome to FriendCord");
  socket.on("connection", (msg) => {
    io.emit("connection", msg);
  });

  socket.on("message", async (msg) => {
    let uid = createUniqueID(msg.from, msg.to);
    try {
      const message = await (new Message({
        ...msg,
        uid,
      })).save();
      return io.emit("result", message);
    }
    catch(err) {
      console.log(err);
    }
  });
});

server.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
