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
  { timestamps: { createdAt: "created_at" } }
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
    approved: {
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
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Card = mongoose.model("cards", cardSchema, "cards");
const Eop = mongoose.model("eops", eopSchema, "eops");

module.exports = { Card, Eop };
