const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { Meal } = require("../models");

router.get("/", authenticate, async (req, res) => {
  const { dayIndex } = req.query;
  try {
    const meals = await Meal.find({ dayIndex }).exec();
    return res.status(200).json(meals);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

router.post("/", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    const { dayIndex, timeIndex } = req.body;
    const already = await Meal.findOne({ dayIndex, timeIndex }).exec();
    if (already) {
      console.log(already);
      await already.deleteOne();
    }
    const newMeal = new Meal(req.body);
    await newMeal.save();
    return res.status(201).json(newMeal);
  } catch (err) {
    return res.status(500).json({ msg: "failed to create" });
  }
});

router.put("/vote/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await Meal.findById(id).exec();
    if (!meal) {
      return res.status(404).json({ msg: "meal not found" });
    }
    if (meal.upVotes.includes(req.user._id)) {
      await Meal.updateOne({ _id: id }, { $pull: { upVotes: req.user._id } });
      return res.status(200).json({ msg: "vote down" });
    } else {
      await Meal.updateOne(
        { _id: id },
        { $addToSet: { upVotes: req.user._id } }
      );
      return res.status(200).json({ msg: "vote up" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "failed to vote" });
  }
});

router.delete("/", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    await Meal.deleteMany().exec();
    return res.status(200).json({ msg: "deleted all" });
  } catch (err) {
    return res.status(500).json({ msg: "failed to delete all" });
  }
});

module.exports = router;
