const express = require("express");
const router = express.Router();

const { Student } = require("../models");

router.post("/", async (req, res) => {
  let count = 0;
  await req.body.forEach(async (element) => {
    count++;
    const newStudent = new Student({ ...element });
    await newStudent.save();
  });
  return res.status(201).json({ msg: `initlized ${count} studnets` });
});

module.exports = router;
