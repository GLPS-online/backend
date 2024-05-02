const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");

const { Student, User } = require("../models");

router.get("/users/:clubName", authenticate, async (req, res) => {
  try {
    const { clubName } = req.params;
    const users = await User.find({ club: clubName }).exec();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

router.get("/students", authenticate, async (req, res) => {
  try {
    const allStudents = await Student.find().select(
      "_id korName status birthDate className club clubChoice1 clubChoice2 clubChoice3"
    );
    return res.status(200).json(allStudents);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

router.get("/choices", authenticate, async (req, res) => {
  try {
    const allStudents = await Student.find().select(
      "_id korName clubChoice1 clubChoice2 clubChoice3"
    );
    return res.status(200).json(allStudents);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

router.put("/", authenticate, async (req, res) => {
  if (req.user.admin < 2) {
    return res.status(403).json({ msg: "no privilege" });
  }
  try {
    let count = 0;
    for (const item of req.body) {
      await Student.findByIdAndUpdate(item._id, {
        club: item.club,
        // clubChoice1: item.clubChoice1,
        // clubChoice2: item.clubChoice2,
        // clubChoice3: item.clubChoice3,
      }).exec();
      count++;
    }
    return res.status(201).json({ msg: `assigned club to ${count} studnets` });
  } catch (err) {
    return res.status(500).json({ msg: "failed to assign club" });
  }
});

module.exports = router;
