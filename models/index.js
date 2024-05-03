const Student = require("./StudentSchema");
const Timetable = require("./TimetableSchema");
const User = require("./UserSchema");
const Meal = require("./MealSchema");
const { Card, Eop } = require("./ActionsSchema");

module.exports = {
  Student,
  User,
  Meal,
  Timetable,
  Card,
  Eop,
};
