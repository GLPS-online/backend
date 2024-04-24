const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { User } = require("../models");

router.get("/", authenticate, async (req, res) => {
  if (req.query.position) {
    try {
      const user = await User.findOne({ position: req.query.position });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ msg: "failed to find" });
    }
  }
  if (req.query.area) {
    try {
      const user = await User.findOne({ area: req.query.area });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ msg: "failed to find" });
    }
  }
  try {
    const allUsers = await User.find().sort({ sortOrder: "asc" });
    console.log(allUsers);
    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "failed to load" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

//  개발용
// /*
router.post("/", async (req, res) => {
  try {
    let count = 0;
    const promises = req.body.map(async (element) => {
      const newUser = new User({ ...element });
      await newUser.save();
      count++;
    });
    await Promise.all(promises);
    return res.status(201).json({ msg: `initlized ${count} users` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "failed to create" });
  }
});
// */

router.put("/:id", authenticate, async (req, res) => {
  if (req.user.admin < 1) {
    return res.status(403).json({ msg: "no privilege" });
  }
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, req.body);
    const updated = await User.findById(id);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ msg: "failed to update" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  const { id } = req.params;
  try {
    const deleted = await User.findByIdAndDelete(id).exec();
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(500).json({ msg: "failed to delete one" });
  }
});

// router.delete("/", authenticate, async (req, res) => {
//   if (req.user.admin < 2) {
//     return res.status(403).json({ msg: "no privilege" });
//   }
//   try {
//     const deleted = await User.deleteMany({ admin: { $ne: 2 } }).exec();
//     return res.status(200).json(deleted);
//   } catch (err) {
//     return res.status(500).json({ msg: "failed to delete all" });
//   }
// });

module.exports = router;
