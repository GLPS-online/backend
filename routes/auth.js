const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authenticate } = require("../middlewares/auth");

const { User, Flag } = require("../models");

router.post("/signup", async (req, res) => {
  try {
    const canSignup = await Flag.findOne({ key: "signup" });
    if (!canSignup || !canSignup.value) {
      return res.status(403).json({ msg: "회원가입 기간이 아닙니다." });
    }
    const newUser = new User({ ...req.body });
    const created = await newUser.save();
    console.log(created);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("handle login");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: 20 * 60 * 60,
    });
    res.json({ user: user, token: token });
  } catch (error) {
    return res.status(500).json({ msg: "failed to login " + error });
  }
});

router.put("/grantAdmin/:id", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { admin: "1" });
    const updated = await User.findById(id);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ msg: "failed grant  " + error });
  }
});

router.put("/revokeAdmin/:id", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { admin: "0" });
    const updated = await User.findById(id);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ msg: "failed revoke  " + error });
  }
});

router.put("/changePassword/:id", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const salt = await bcrypt.genSalt();
    console.log(newPassword, salt);
    const hashedPw = await bcrypt.hash(newPassword, salt);
    console.log(hashedPw);
    await User.findByIdAndUpdate(id, {
      password: hashedPw,
    });
    return res.status(200).json({ msg: "password changed" });
  } catch (error) {
    return res.status(500).json({ msg: "failed to change password " + error });
  }
});

router.put("/signupOpen", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    await Flag.findOneAndUpdate(
      { key: "signup" },
      { value: true },
      { upsert: true }
    );
    return res.status(200).json({ msg: "signup open" });
  } catch (error) {
    return res.status(500).json({ msg: "failed to open signup " + error });
  }
});

router.put("/signupClose", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    await Flag.findOneAndUpdate(
      { key: "signup" },
      { value: false },
      { upsert: true }
    );
    return res.status(200).json({ msg: "signup closed" });
  } catch (error) {
    return res.status(500).json({ msg: "failed to close signup " + error });
  }
});

router.get("/me", authenticate, async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ msg: "failed to get my info " + error });
  }
});

// router.delete("/logout", async (req, res) => {
//   try {
//     return res
//       .status(200)
//       .clearCookie("auth", {
//         maxAge: 20 * 60 * 60 * 1000,
//         httpOnly: true,
//       })
//       .json(req.user);
//   } catch (error) {
//     return res.status(500).json({ msg: "failed logout " + error });
//   }
// });

module.exports = router;
