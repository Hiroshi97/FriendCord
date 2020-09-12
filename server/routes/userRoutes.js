const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//ROUTES
/*Send a message*/

router.get("/all", async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/friends", async (req, res) => {
  try {
    console.log("ALO", req.body);
    const user = await User.findOne({...req.body });
    User.getAcceptedFriends(
      user,
      {},
      { name: 1, username: 1, avatar: 1, email: 1 },
      (err, friendships) => {
        return res.status(200).json({ friendships });
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/suggestions", async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/test", async (req, res) => {
  try {
    console.log("ABC");
    console.log("5f5a54257ccdd32d51ce41f7" ^ "5f5c19990953da70dc77eea0");
    const user = await User.findOne({ _id: "5f5a54257ccdd32d51ce41f7" });
    const user2 = await User.findOne({ _id: "5f5c19990953da70dc77eea0" });
    console.log(user._id.getTimestamp().getTime());
    console.log(new Date().getTime());
    await User.requestFriend(user._id, user2._id, () => {});
    await User.requestFriend(user2._id, user._id, () => {});
    await User.getAcceptedFriends(
      user,
      {},
      { name: 1, username: 1, avatar: 1, email: 1 },
      (err, friendships) => {
        return res.status(200).json({ friendships });
      }
    );
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
