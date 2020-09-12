const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Message = require("../models/messageModel");

//ROUTES
// /*Send a message*/

// router.post("/send", async (req, res) => {
//   try {
      
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

router.post("/getMessages", async (req, res) => {
  try {
    console.log("ABC");
      const {id1, id2} = req.body;
      console.log(id1);
      const messages = await Message.find({$or: [{from: id1, to: id2}, {from: id2, to: id1}]}).sort({created_at: 1});
      console.log(messages);
      return res.status(200).json({messages});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;