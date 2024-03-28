const Student = require("./StudentSchema");
const Timetable = require("./TimetableSchema");
const Ptla = require("./PtlaSchema");
const Meal = require("./MealSchema");
const Discharge = require("./DischargeSchema");
const Absence = require("./AbsenceSchema");
const { Club, ClubChoice } = require("./ClubSchema");

module.exports = {
  Student,
  Ptla,
  Absence,
  Discharge,
  Meal,
  Club,
  ClubChoice,
  Timetable,
};
