const express = require("express");
const router = express.Router();

const { Student } = require("../models");

router.get("/", async (req, res) => {
  const allStudents = await Student.find();
  return res.status(200).json(allStudents);
});

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   const student = await Student.findOne({ id });
//   return res.status(200).json(student);
// });

// router.post("/", async (req, res) => {
//   const newStudent = new Student({ ...req.body });
//   const created = await newStudent.save();
//   return res.status(201).json(created);
// });

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Student.updateOne({ id }, req.body);
  const updated = await Student.findOne({ id });
  return res.status(200).json(updated);
});

// router.delete("/", async (req, res) => {
//   const deleted = await Student.deleteMany({}).exec();
//   return res.status(200).json(deleted);
// });

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   const deleted = await Student.findOneAndDelete({ id });
//   return res.status(200).json(deleted);
// });

module.exports = router;
