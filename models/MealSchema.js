const mongoose = require("mongoose");
const { Schema } = mongoose;

const mealSchema = new Schema({
  date: Date,
  time: Number,
  // 0아침 1점심 2저녁
  menu: String,
  //엔터로 구분된 메뉴
});

const Meal = mongoose.model("meals", mealSchema, "meals");

module.exports = Meal;
