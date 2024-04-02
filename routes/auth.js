const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authenticate } = require("../middlewares/auth");

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
      return res.status(404).json({ msg: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: 20 * 60 * 60,
    });
    console.log(token);
    res
      .cookie("auth", token, {
        maxAge: 20 * 60 * 60 * 1000, // 20시간후 만료
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    return res.status(500).json({ msg: "failed to login " + error });
  }
});

router.put("/grantAdmin/:id", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    const { id } = req.params;
    await Ptla.findByIdAndUpdate(id, { admin: 1 });
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ msg: "failed grand  " + error });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ msg: "failed to get my info " + error });
  }
});

router.delete("/logout", async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("auth", {
        maxAge: 20 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json(req.user);
  } catch (error) {
    return res.status(500).json({ msg: "failed logout " + error });
  }
});

module.exports = router;
