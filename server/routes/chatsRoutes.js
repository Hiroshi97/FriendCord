const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Message = require("../models/messageModel");
const { createUniqueID } = require("../utils/create-unique-id");

//ROUTES

router.post("/getMessages", async (req, res) => {
  try {
    if (
      req.headers.authorization === req.body.id1 + req.body.id1.slice(-3) ||
      req.headers.authorization === req.body.id2 + req.body.id2.slice(-3)
    ) {
      const { id1, id2 } = req.body;
      //Get all messages of friends
      const messages = await Message.find({
        $or: [
          { from: id1, to: id2 },
          { from: id2, to: id1 },
        ],
      }).sort({ created_at: 1 });
      return res.status(200).json({ messages });
    } else return res.status(500).json("Unauthorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/getLastMessages", async (req, res) => {
  try {
    if (req.headers.authorization === req.body.id + req.body.id.slice(-3)) {
      const { id } = req.body;
      const user = await User.findOne(
        { _id: id },
        { name: 1, username: 1, avatar: 1, email: 1 }
      );

      const lastMessages = await Message.aggregate([
        { $match: {$or: [{from: id}, {to: id}]}},
        { $sort: { created_at: -1 } },
        {
          $group: {
            _id: "$uid",
            message: { $first: "$message" },
            from: { $first: "$from" },
            to: { $first: "$to" },
            time: { $first: "$created_at"}
          },
        },
      ])

      return res.status(200).json({ lastMessages });

    } else return res.status(500).json("Unauthorized");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Get last messages

module.exports = router;
