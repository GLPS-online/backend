const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Ptla } = require("../models");

router.post("/signup", async (req, res) => {
  try {
    const newPtla = new Ptla({ ...req.body });
    const created = await newPtla.save();
    console.log(created);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ msg: "failed to create " + err });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("handle login");
    const { user_id, password } = req.body;
    const user = await Ptla.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24 hour",
    });
    console.log(token);
    res
      .cookie("auth", token)
      .status(200)
      .json({ success: true, userId: user._id });
  } catch (error) {
    return res.status(500).json({ msg: "failed to login " + error });
  }
});

module.exports = router;
