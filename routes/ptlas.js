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

// router.post("/", async (req, res) => {
//   try {
//     const newPtla = new Ptla({ ...req.body });
//     const created = await newPtla.save();
//     console.log(created);
//     return res.status(201).json(created);
//   } catch (err) {
//     return res.status(500).json({ msg: "failed to create" });
//   }
// });

router.post("/", async (req, res) => {
  try {
    let count = 0;
    const promises = req.body.map(async (element) => {
      const newPtla = new Ptla({ ...element });
      await newPtla.save();
      count++;
    });
    await Promise.all(promises);
    return res.status(201).json({ msg: `initlized ${count} ptlas` });
  } catch (err) {
    console.log(err);
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

router.delete("/", async (req, res) => {
  try {
    const deleted = await Ptla.deleteMany({ admin: { $ne: 2 } }).exec();
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(500).json({ msg: "failed to delete all" });
  }
});

module.exports = router;
