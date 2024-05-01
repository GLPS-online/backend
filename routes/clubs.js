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
      "_id korName birthDate className club clubChoice1 clubChoice2 clubChoice3"
    );
    return res.status(200).json(allStudents);
  } catch (err) {
    return res.status(500).json({ msg: "failed to find" });
  }
});

module.exports = router;
