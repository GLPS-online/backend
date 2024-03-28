const mongoose = require("mongoose");
const { Schema } = mongoose;

const AbsenceSchema = new Schema({
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
  returnedDateTime: {
    type: Date,
    required: false,
  },
});

const Absence = mongoose.model("absences", AbsenceSchema, "absences");

module.exports = Absence;
