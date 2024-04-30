const Student = require("./StudentSchema");
const Timetable = require("./TimetableSchema");
const User = require("./UserSchema");
const Meal = require("./MealSchema");
const Discharge = require("./DischargeSchema");
const Absence = require("./AbsenceSchema");

module.exports = {
  Student,
  User,
  Absence,
  Discharge,
  Meal,
  Timetable,
};
