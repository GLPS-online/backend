const express = require("express");
const router = express.Router();

const { Timetable } = require("../models");

router.get("/", async (req, res) => {
  const allTimetables = await Timetable.find();
  return res.status(200).json(allTimetables);
});

router.get("/:className", async (req, res) => {
  const { className } = req.params;
  const timetable = await Timetable.findOne({ className });
  return res.status(200).json(timetable);
});

router.post("/:className", async (req, res) => {
  const { className } = req.params;
  const table = req.body;
  const newTimetable = new Timetable({
    className,
    table,
  });
  const created = await newTimetable.save();
  return res.status(201).json(created);
});

router.delete("/:className", async (req, res) => {
  const { className } = req.params;
  const deleted = await Timetable.findOneAndDelete({ className });
  return res
    .status(200)
    .json(deleted ? "deletion success" : "nothing is deleted");
});

module.exports = router;
