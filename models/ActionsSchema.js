const mongoose = require("mongoose");
const { Schema } = mongoose;

const cardSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    type: {
      type: String,
      enum: ["red", "yellow", "green"],
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const eopSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    isApproved: {
      type: Boolean,
      required: false,
      default: false,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false,
      default: null,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const studySchema = new Schema(
  {
    date: {
      type: String, // 8/15, 7/17, 6/6 ...
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const shuttleSchema = new Schema(
  {
    date: {
      type: String, // 8/15, 7/17, 6/6 ...
      required: true,
    },
    time: {
      type: String,
      enum: ["오전등교", "2 ➔ 3 교시", "오후등교", "6 ➔ 7 교시", "자습수업"],
      required: true,
    },
    departure: {
      type: String,
      enum: ["덕고관", "영교/민교관", "다산/충무관", "체육관", "국궁장"],
      required: true,
    },
    destination: {
      type: String,
      enum: ["덕고관", "영교/민교관", "다산/충무관", "체육관", "국궁장"],
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("cards", cardSchema, "cards");
const Eop = mongoose.model("eops", eopSchema, "eops");
const Study = mongoose.model("studies", studySchema, "studies");
const Shuttle = mongoose.model("shuttles", shuttleSchema, "shuttles");

module.exports = { Card, Eop, Study, Shuttle };
