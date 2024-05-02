const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { Student } = require("../models");

router.get("/", authenticate, async (req, res) => {
  try {
    const allStudents = await Student.find().select(
      "_id korName status school grade birthDate className roomNum"
    );
    return res.status(200).json(allStudents);
  } catch (err) {
    return res.status(500).json({ msg: "failed to load" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

router.post("/", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    let count = 0;
    for (const item of req.body) {
      const newStudent = new Student({ ...item });
      await newStudent.save();
      count++;
    }
    return res.status(201).json({ msg: `initlized ${count} studnets` });
  } catch (err) {
    return res.status(500).json({ msg: "failed to initialize" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  if (req.user.admin < 1) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    const { id } = req.params;
    await Student.findByIdAndUpdate(id, req.body);
    const updated = await Student.findById(id);
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ msg: "failed to update" });
  }
});

router.delete("/", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    const deleted = await Student.deleteMany({}).exec();
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(500).json({ msg: "failed to delete all" });
  }
});

// router.delete("/:id", authenticate, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Student.findByIdAndDelete(id);
//     return res.status(200).json(deleted);
//   } catch (err) {
//     return res.status(500).json({ msg: "failed to delete" });
//   }
// });

module.exports = router;
