const express = require("express");
const router = express.Router();

const { Timetable } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allTimetables = await Timetable.find();
    return res.status(200).json(allTimetables);
  } catch (err) {
    return res.status(500).json({ msg: "failed to load" });
  }
});

router.get("/:className", async (req, res) => {
  try {
    const { className } = req.params;
    const timetable = await Timetable.findOne({ className });
    return res.status(200).json(timetable);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

router.post("/:className", async (req, res) => {
  try {
    const { className } = req.params;
    // console.log(req.body);
    const { advisor, office, table } = req.body;
    const newTimetable = new Timetable({
      className,
      advisor,
      office,
      table,
    });
    const created = await newTimetable.save();
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ msg: "failed to save" });
  }
});

router.delete("/:className", async (req, res) => {
  try {
    const { className } = req.params;
    const deleted = await Timetable.findOneAndDelete({ className });
    return res
      .status(200)
      .json(deleted ? "deletion success" : "nothing is deleted");
  } catch (err) {
    return res.status(500).json({ msg: "failed to delete" });
  }
});

module.exports = router;
