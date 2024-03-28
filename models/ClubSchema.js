const mongoose = require("mongoose");
const { Schema } = mongoose;

const clubSchema = new Schema({
  name: String,
  location: String,
});

const clubChoiceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  clubFirstChoice: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: false,
  },
  clubSecondChoice: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: false,
  },
  clubThirdChoice: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: false,
  },
});

const Club = mongoose.model("clubs", clubSchema, "clubs");
const ClubChoice = mongoose.model(
  "clubchoices",
  clubChoiceSchema,
  "clubchoices"
);

module.exports = {
  Club,
  ClubChoice,
};
