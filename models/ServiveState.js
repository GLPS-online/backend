const mongoose = require("mongoose");
const { Schema } = mongoose;

const Flags = new Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: Boolean,
    required: true,
  },
});

const Flag = mongoose.model("flags", Flags, "flags");

module.exports = Flag;
