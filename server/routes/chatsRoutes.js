const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Message = require("../models/messageModel");

//ROUTES

router.post("/getMessages", async (req, res) => {
  try {
    if (
      req.headers.authorization === req.body.id1 + req.body.id1.slice(-3) ||
      req.headers.authorization === req.body.id2 + req.body.id2.slice(-3)
    ) {
      const { id1, id2 } = req.body;
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

module.exports = router;
