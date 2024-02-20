const mongoose = require("mongoose");

// 스키마를 먼저 디자인해야함
//이미 있는 컬렉션에 접속하려면 스키마가 일치해야함
const studentSchema = new mongoose.Schema(
  {
    id: {
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
    classNum: {
      type: Number,
      required: true,
    },
    dormFloorNum: {
      type: Number,
      required: true,
    },
    roomNum: {
      type: Number,
      required: true,
    },
    roomSeatNum: {
      type: Number,
      required: true,
    },
    clubName: {
      type: Number,
      required: false,
    },
  },
  { strict: true }
);

//이후 모델 함수에 2스키마와 1모델 이름을 넘김.
//1모델 이름이 현존하는 컬렉션과 일치하거나 3세 번째 인자로 현존하는 컬렉션 이름을 넘겨주면, 현존하는 컬렉션에 연결됨.
//모델 이름은 항상 소문자이며 복수형 영단어

const Student = mongoose.model("students", studentSchema, "students");

// 앞으로 모델을 가지고 작업하면 됨.
module.exports = { Student };
