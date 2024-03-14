const express = require("express");
const router = express.Router();

const { Ptla } = require("../models");

router.get("/", async (req, res) => {
  if (req.query.role) {
    try {
      const ptla = await Ptla.findOne({ role: req.query.role });
      return res.status(200).json(ptla);
    } catch (err) {
      return res.status(500).json({ msg: "failed to find" });
    }
  }
  if (req.query.area) {
    try {
      const ptla = await Ptla.findOne({ area: req.query.area });
      return res.status(200).json(ptla);
    } catch (err) {
      return res.status(500).json({ msg: "failed to find" });
    }
  }
  try {
    const allPtlas = await Ptla.find();
    return res.status(200).json(allPtlas);
  } catch (err) {
    return res.status(500).json({ msg: "failed to load" });
  }
});

router.post("/", async (req, res) => {
  // let count = 0;
  // await req.body.forEach(async (element) => {
  //   count++;
  //   const newPtla = new Ptla({ ...element });
  //   await newPtla.save();
  // });
  // return res.status(201).json({ msg: `initlized ${count} ptlas` });
  try {
    const newPtla = new Ptla({ ...req.body });
    const created = await newPtla.save();
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ msg: "failed to create" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Ptla.findByIdAndUpdate(id, req.body);
    const updated = await Ptla.findOne({ id });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ msg: "failed to update" });
  }
});

module.exports = router;
