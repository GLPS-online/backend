const mongoose = require("mongoose");
const { Schema } = mongoose;

const dischargeSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  classpaId: {
    type: Schema.Types.ObjectId,
    ref: "Ptla",
  },
  floorlaId: {
    type: Schema.Types.ObjectId,
    ref: "Ptla",
  },
  reason: String,
  leftDateTime: {
    type: Date,
    required: true,
  },
});

const Discharge = mongoose.model("discharges", dischargeSchema, "discharges");
module.exports = Discharge;
