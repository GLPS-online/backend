const express = require("express");
const router = express.Router();

const { Student } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allStudents = await Student.find();
    return res.status(200).json(allStudents);
  } catch (err) {
    return res.status(500).json({ msg: "failed to load" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

router.post("/", async (req, res) => {
  try {
    let count = 0;
    const promises = req.body.map(async (element) => {
      const newStudent = new Student({ ...element });
      await newStudent.save();
      count++;
    });
    await Promise.all(promises);
    return res.status(201).json({ msg: `initlized ${count} studnets` });
  } catch (err) {
    return res.status(500).json({ msg: "failed to initialize" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndUpdate(id, req.body);
    const updated = await Student.findOne({ id });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ msg: "failed to update" });
  }
});

router.delete("/", async (req, res) => {
  try {
    const deleted = await Student.deleteMany({}).exec();
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(500).json({ msg: "failed to delete all" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(500).json({ msg: "failed to delete" });
  }
});

module.exports = router;
