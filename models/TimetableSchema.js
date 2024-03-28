const mongoose = require("mongoose");
const { Schema } = mongoose;
const timetableSchema = new Schema({
  className: { type: String, required: true },
  advisor: { type: String, required: true },
  office: { type: String, required: true },
  table: [
    { subject: String, location: String }, // 월 1/2교시 부터 토3/4교시까지 총 22개 elements
  ],
});

const Timetable = mongoose.model("timetables", timetableSchema, "timetables");

module.exports = Timetable;
