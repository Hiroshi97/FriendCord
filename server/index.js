const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv/config");
const Message = require("./models/messageModel");
const User = require("./models/userModel");
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


// Socket IO Connection
io.on("connection", (socket) => {
  console.log("New connection");

  //Send msg
  socket.on("sendMsg", async (msg) => {
    let uid = createUniqueID(msg.from, msg.to);
    try {
      const message = await (new Message({
        ...msg,
        uid,
      })).save();
      return io.emit("receiveMsg", message);
    }
    catch(err) {
      console.log(err);
    }
  });

  socket.on("addFriend", async (msg) => {
    console.log(msg);
    const {id1, id2} = msg;
    try {
      User.requestFriend(id1, id2, ()=>{});
      return io.emit("updateFriend", "");
    }
    catch(err) {
      console.log(err);
    }
  });

  socket.on("cancelFriend", async (msg) => {
    console.log(msg);
    const {id1, id2} = msg;
    const user1 = await User.findOne({_id: id1});
    const user2 = await User.findOne({_id: id2});
    try {
      User.removeFriend(user1, user2, ()=>{});
      return io.emit("updateFriend", "");
    }
    catch(err) {
      console.log(err);
    }
  });

  socket.on('disconnect', () => {
    socket.removeAllListeners();
 });
 
});

server.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
