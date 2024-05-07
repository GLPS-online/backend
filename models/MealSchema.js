const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema({
  dayIndex: {
    type: Number, // 0 for monday, 6 for sunday
    required: true,
  },
  timeIndex: {
    type: Number, // 0 for breakfast, 1 for lunch, 2 for dinner, 3 for snack
    required: true,
  },
  menu: {
    type: String, // 백미밥, 김치볶음<sup>5.9</sup>, 낙지수제비<sup>5.6</sup>
    required: true,
  },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "users" }],
});

const Meal = mongoose.model("meals", mealSchema, "meals");

module.exports = Meal;
