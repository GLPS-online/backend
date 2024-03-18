const mongoose = require("mongoose");
const { Schema } = mongoose;

// 스키마를 먼저 디자인해야함
//이미 있는 컬렉션에 접속하려면 스키마가 일치해야함
const studentSchema = new Schema(
  {
    glpsId: Number,
    korName: String,
    engName: String,
    status: {
      type: String,
      required: false,
      default: "not-enrolled", //'enrolled', 'went-home', 'left-camp'
    },
    birthDate: Number,
    gender: String,
    school: String,
    grade: Number,
    postNum: String,
    address: String,
    parent1Relation: String,
    parent1Phone: String,
    parent2Relation: String, // 없으면 ""
    parent2Phone: String, // 없으면 ""
    shirtSize: String,
    allergy: String, // 없으면 ""
    sibling: String, // 없으면 ""
    className: String, // Liberty, Fraternity etc..
    roomNum: Number,
    club: {
      type: Schema.Types.ObjectId,
      ref: "Club",
      required: false,
      default: null,
    },
  },
  { timestamps: { updatedAt: "updated_at" } }
);

const ptlaSchema = new Schema(
  {
    user_id: String,
    password: String,
    admin: {
      type: Number,
      enum: [0, 1, 2],
      required: false,
      default: 0,
    },
    korName: String,
    engName: String,
    wave: Number,
    gender: String,
    phone: String,
    division: String,
    role: String,
    // glps-coordinator, pa-class4, pa-computer, ta-rp, la-health-m

    area: {
      type: String,
      // TA의 경우: 맡은 교실 D-207
      // LA의 경우: 맡은 층 dorm-7
      // 해당사항 없는 경우: null
      required: false,
      default: null,
    },
    roomNum: Number,
    club: {
      type: Schema.Types.ObjectId,
      ref: "Club",
      required: false,
      default: null,
    },
  },
  { timestamps: { updatedAt: "updated_at" } }
);

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
  reason: String,
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
  reason: String,
  leftDateTime: {
    type: Date,
    required: true,
  },
});

const mealSchema = new Schema({
  date: Date,
  time: Number,
  // 0아침 1점심 2저녁
  menu: String,
  //엔터로 구분된 메뉴
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
  advisor: { type: String, required: true },
  office: { type: String, required: true },
  table: [
    { subject: String, location: String }, // 월 1/2교시 부터 토3/4교시까지 총 22개 elements
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
