const express = require("express");
const router = express.Router();

const { Ptla } = require("./models");

router.get("/", async (req, res) => {
  const allPtlas = await Ptla.find();
  return res.status(200).json(allPtlas);
});

router.post("/", async (req, res) => {
  const newPtla = new Ptla({ ...req.body });
  const created = await newPtla.save();
  return res.status(201).json(created);
});

module.exports = router;
