const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { Card, Eop } = require("../models");

router.post("/card", authenticate, async (req, res) => {
  const { student, type, reason } = req.body;
  const { _id: user } = req.user;

  try {
    const newCard = new Card({ student, user, type, reason });
    await newCard.save();
    res.status(201).send(newCard);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.get("/card", authenticate, async (req, res) => {
  try {
    const cards = await Card.find({}).populate("student user", { korName: 1 });
    // const cards = await Card.find({});
    res.status(200).send(cards);
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

router.post("/eop", authenticate, async (req, res) => {
  const { student, reason } = req.body;
  const { _id: user } = req.user;

  try {
    const newEop = new Eop({ student, user, reason });
    await newEop.save();
    res.status(201).send(newEop);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.get("/eop", authenticate, async (req, res) => {
  try {
    const eops = await Eop.find({}).populate("student user approved", {
      korName: 1,
    });
    res.status(200).send(eops);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.put("/eop/:id", authenticate, async (req, res) => {
  const { _id: user } = req.user;
  try {
    const { id } = req.params;
    const check = await Eop.findById(id);
    if (check.approved) {
      return res.status(400).json({ msg: "Already approved" });
    }
    const update = await Eop.findByIdAndUpdate(id, { approved: user });
    res.status(200).send(update);
  } catch (err) {
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

module.exports = router;
