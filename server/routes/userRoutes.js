const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//ROUTES

router.get("/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ username: id }, { _id: 1, name: 1, username: 1, avatar: 1, email: 1 }) || await User.findOne({ email: id }, { _id: 0, name: 1, username: 1, avatar: 1, email: 1 });
    return res.status(200).json({user})
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

router.get("/all", async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/friends", async (req, res) => {
  console.log(req.headers);
  try {
    if (Object.keys(req.body).length) {
      const user = await User.findOne({ ...req.body }, { _id: 1, name: 1, username: 1, avatar: 1, email: 1 });

      User.getAcceptedFriends(
        user,
        {},
        { _id: 1, name: 1, username: 1, avatar: 1, email: 1 },
        (err, friendships) => {
          return res.status(200).json({ friendships });
        }
      );
    } else return res.status(500).json("Empty request!");
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

module.exports = router;
