const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { Timetable } = require("../models");

// router.get("/", authenticate, async (req, res) => {
//   try {
//     const allTimetables = await Timetable.find().select("_id className");
//     return res.status(200).json(allTimetables);
//   } catch (err) {
//     return res.status(500).json({ msg: "failed to load" });
//   }
// });

router.get("/:className", authenticate, async (req, res) => {
  try {
    const { className } = req.params;
    const timetable = await Timetable.findOne({ className });
    return res.status(200).json(timetable);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

router.post("/:className", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
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

router.delete("/:className", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
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
