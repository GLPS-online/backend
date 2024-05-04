const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { Card, Eop } = require("../models");
const { Study, Shuttle } = require("../models/ActionsSchema");

router.get("/card", authenticate, async (req, res) => {
  try {
    const { type } = req.query;
    const cards = await Card.find({ type: type })
      .sort({ _id: -1 })
      .populate("student user", { korName: 1 });
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.post("/card", authenticate, async (req, res) => {
  try {
    const { students, type, note } = req.body;
    const { _id: user } = req.user;
    let count = 0;
    for (const student of students) {
      const newCard = new Card({ student, user, type, note });
      await newCard.save();
      count++;
    }
    res.status(201).json({ msg: `posted ${count} data` });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.delete("/card/:id", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    const { id } = req.params;
    await Card.findByIdAndDelete(id);
    res.status(200).json({ msg: "deleted" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.get("/eop", authenticate, async (req, res) => {
  try {
    const eops = await Eop.find()
      .sort({ _id: -1 })
      .populate("student user approvedBy", {
        korName: 1,
      });
    res.status(200).json(eops);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.post("/eop", authenticate, async (req, res) => {
  try {
    const { students, note } = req.body;
    const { _id: user } = req.user;
    let count = 0;
    for (const student of students) {
      const newEop = new Eop({ student, user, note });
      await newEop.save();
      count++;
    }
    res.status(201).json({ msg: `posted ${count} data` });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
});

router.put("/eop/:id", authenticate, async (req, res) => {
  try {
    const { _id: user } = req.user;
    const { id } = req.params;
    const check = await Eop.findById(id);
    if (check.isApproved) {
      return res.status(400).json({ msg: "Already approved" });
    }
    const date = new Date();
    const now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    );
    const current = new Date(now_utc);
    const difference = current - check.createdAt;
    if (difference > 1000 * 60 * 60 * 24) {
      return res.status(400).json({ msg: "24시간이 지났습니다" });
    }
    await Eop.findByIdAndUpdate(id, {
      isApproved: true,
      approvedBy: user,
    });
    const updated = await Eop.findById(id);
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
});

router.delete("/eop/:id", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    const { id } = req.params;
    await Eop.findByIdAndDelete(id);
    res.status(200).json({ msg: "deleted" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.get("/study", authenticate, async (req, res) => {
  try {
    const { date } = req.query;
    const studies = await Study.find({ date: date }).populate("student user", {
      korName: 1,
    });
    res.status(200).json(studies);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.post("/study", authenticate, async (req, res) => {
  try {
    const { students, date } = req.body;
    const { _id: user } = req.user;
    let count = 0;
    for (const student of students) {
      const newStudy = new Study({ student, user, date });
      await newStudy.save();
      count++;
    }
    res.status(201).json({ msg: `posted ${count} data` });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.delete("/study/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const toDelete = await Study.findById(id);
    if (toDelete.user !== req.user._id && req.user.admin < 1) {
      return res.status(403).json({ msg: "no privilege" });
    }
    await Study.findByIdAndDelete(id);
    res.status(200).json({ msg: "deleted" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.get("/shuttle", authenticate, async (req, res) => {
  try {
    const { date } = req.query;
    const shuttles = await Shuttle.find({ date: date }).populate(
      "student user",
      { korName: 1 }
    );
    res.status(200).json(shuttles);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.post("/shuttle", authenticate, async (req, res) => {
  try {
    const { students, date, time, departure, destination } = req.body;
    const { _id: user } = req.user;
    let count = 0;
    for (const student of students) {
      const newShuttle = new Shuttle({
        student,
        user,
        date,
        time,
        departure,
        destination,
      });
      await newShuttle.save();
      count++;
    }
    res.status(201).json({ msg: `posted ${count} data` });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.delete("/shuttle/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const toDelete = await Shuttle.findById(id);
    if (toDelete.user !== req.user._id && req.user.admin < 1) {
      return res.status(403).json({ msg: "no privilege" });
    }
    await Shuttle.findByIdAndDelete(id);
    res.status(200).json({ msg: "deleted" });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
