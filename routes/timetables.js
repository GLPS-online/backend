const express = require("express");
const router = express.Router();

const { Timetable } = require("../models");

router.get("/", async (req, res) => {
  const allTables = await Timetable.find();
  return res.status(200).json(allTables);
});

router.get("/:className", async (req, res) => {
  const { className } = req.params;
  const table = await Timetable.findOne({ className });
  return res.status(200).json(table);
});

router.post("/", async (req, res) => {
  const { className = "0", table = [] } = req.body;
  const newTimetable = new Timetable({
    className,
    table,
  });
  const created = await newTimetable.save();
  return res.status(201).json(created);
});

router.delete("/", async (req, res) => {
  const deleted = await Timetable.deleteMany({}).exec();
  return res.status(200).json(deleted);
});

module.exports = router;
