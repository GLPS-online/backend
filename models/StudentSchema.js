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
      enum: ["pending", "active", "absent", "discharged"],
      default: "active", // 'pending', 'active', 'absent(nurse/hospital/counseling..etc)', 'discharged'
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
      type: String,
      required: false,
      default: "",
    },
    clubChoice1: {
      type: String,
      required: false,
      default: "",
    },
    clubChoice2: {
      type: String,
      required: false,
      default: "",
    },
    clubChoice3: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

//이후 모델 함수에 2스키마와 1모델 이름을 넘김.
//1모델 이름이 현존하는 컬렉션과 일치하거나 3세 번째 인자로 현존하는 컬렉션 이름을 넘겨주면, 현존하는 컬렉션에 연결됨.
//모델 이름은 항상 소문자이며 복수형 영단어

const Student = mongoose.model("students", studentSchema, "students");

// 앞으로 모델을 가지고 작업하면 됨.
module.exports = Student;
