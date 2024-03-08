const express = require("express");
const router = express.Router();

const { Ptla } = require("../models");

router.get("/", async (req, res) => {
  if (req.query.role !== "") {
    const ptla = await Ptla.findOne({ role: req.query.role });
    return res.status(200).json(ptla);
  }
  if (req.query.area !== "") {
    const ptla = await Ptla.findOne({ area: req.query.area });
    return res.status(200).json(ptla);
  }
  const allPtlas = await Ptla.find();
  return res.status(200).json(allPtlas);
});

router.post("/", async (req, res) => {
  const newPtla = new Ptla({ ...req.body });
  const created = await newPtla.save();
  return res.status(201).json(created);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Ptla.updateOne({ id }, req.body);
  const updated = await Ptla.findOne({ id });
  return res.status(200).json(updated);
});

module.exports = router;
