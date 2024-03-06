const mongoose = require("mongoose");
const { Schema } = mongoose;

// 스키마를 먼저 디자인해야함
//이미 있는 컬렉션에 접속하려면 스키마가 일치해야함
const studentSchema = new Schema({
  glpsId: {
    type: Number,
    required: true,
  },
  korName: {
    type: String,
    required: true,
  },
  engName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
    default: "not-enrolled", //'active', 'went-home', 'left-camp'
  },
  birthDate: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  postNum: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  parent1Relation: {
    type: String,
    required: true,
  },
  parent1Phone: {
    type: String,
    required: true,
  },
  parent2Relation: {
    type: String,
    required: false,
    default: null,
  },
  parent2Phone: {
    type: String,
    required: false,
    default: null,
  },
  shirtSize: {
    type: String,
    required: true,
  },
  className: {
    type: String, // Liberty, Fraternity etc..
    required: true,
  },
  roomNum: {
    type: Number,
    required: true,
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: false,
    default: null,
  },
});

const ptlaSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
  admin: {
    // 관리자 권한 = 모든 셀 수정권한
    type: Boolean,
    required: false,
    default: false,
  },
  korName: {
    type: String,
    required: true,
  },
  engName: {
    type: String,
    required: true,
  },
  wave: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    // glps-coordinator, pa-class4, pa-computer, ta-rp, la-health-m
    required: true,
  },
  designation: {
    type: String,
    // 클래스PA의 경우: 어드바이저 호실 M-101
    // TA의 경우: 맡은 교실 D-207
    // LA의 경우: 맡은 층 dorm-7
    // 헤드쿼터 상주: glps-hq
    // 해당사항 없는 경우: null
    required: false,
    default: null,
  },
  roomNum: {
    type: Number,
    required: true,
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: false,
  },
});

const LOASchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  classpaId: {
    type: Schema.Types.ObjectId,
    ref: "Ptla",
  },
  floorlaId: {
    type: Schema.Types.ObjectId,
    ref: "Ptla",
  },
  reason: {
    type: String,
    required: true,
  },
  leftDateTime: {
    type: Date,
    required: true,
  },
  returnedDateTime: {
    type: Date,
    required: false,
  },
});

const dischargeSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  classpaId: {
    type: Schema.Types.ObjectId,
    ref: "Ptla",
  },
  floorlaId: {
    type: Schema.Types.ObjectId,
    ref: "Ptla",
  },
  reason: {
    type: String,
    required: true,
  },
  leftDateTime: {
    type: Date,
    required: true,
  },
});

const mealSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    // 0아침 1점심 2저녁
    required: true,
  },
  menu: {
    type: String,
    //엔터로 구분된 메뉴
    required: true,
  },
});

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

const timetableSchema = new Schema({
  className: { type: String, required: true },
  table: [
    { subject: String, location: String }, // 월 1~2교시
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String },
    { subject: String, location: String }, // 금 7교시
    { subject: String, location: String },
    { subject: String, location: String }, //토 3~4교시
  ],
});

//이후 모델 함수에 2스키마와 1모델 이름을 넘김.
//1모델 이름이 현존하는 컬렉션과 일치하거나 3세 번째 인자로 현존하는 컬렉션 이름을 넘겨주면, 현존하는 컬렉션에 연결됨.
//모델 이름은 항상 소문자이며 복수형 영단어

const Student = mongoose.model("students", studentSchema, "students");
const Ptla = mongoose.model("ptlas", ptlaSchema, "ptlas");
const Absence = mongoose.model("absences", LOASchema, "absences");
const Discharge = mongoose.model("discharges", dischargeSchema, "discharges");
const Meal = mongoose.model("meals", mealSchema, "meals");
const Club = mongoose.model("clubs", clubSchema, "clubs");
const ClubChoice = mongoose.model(
  "clubchoices",
  clubChoiceSchema,
  "clubchoices"
);
const Timetable = mongoose.model("timetables", timetableSchema, "timetables");

// 앞으로 모델을 가지고 작업하면 됨.
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
