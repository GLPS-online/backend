// import password from "./password";
const credentials = require("./credentials");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); // 미들웨어, 바디로 온 json을 전처리해줌

const { Student } = require("./models");

let students = require("./mock");

app.get("/students", async (req, res) => {
  const allStudents = await Student.find();
  return res.status(200).json(allStudents);
});

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findOne({ id });
  return res.status(200).json(student);
});

app.post("/students", async (req, res) => {
  const newStudent = new Student({ ...req.body });
  const insertedStudent = await newStudent.save();
  return res.status(201).json(insertedStudent);
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  await Student.updateOne({ id }, req.body);
  const updatedStudent = await Student.findOne({ id });
  return res.status(200).json(updatedStudent);
});

app.delete("/students", async (req, res) => {
  const deleted = await Student.deleteMany({}).exec();
  return res.status(200).json(deleted);
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  const deletedStudent = await Student.findOneAndDelete({ id });
  return res.status(200).json(deletedStudent);
});

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${credentials.id}:${credentials.password}@cluster0.odlbq4i.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: `glps`,
      }
    );
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

// app.get("/students", (req, res) => {
//   const { classNum } = req.query;
//   if (classNum) {
//     // console.log(typeof classNum);
//     const classMembers = students.filter((s) => s.classNum == Number(classNum));
//     // console.log(classMembers);
//     res.send(classMembers);
//   } else {
//     res.send(students);
//   }
// });

// app.get("/students/:id", (req, res) => {
//   const { id } = req.params;
//   const student = students.find((s) => s.id === Number(id));
//   if (student) {
//     res.send(student);
//   } else {
//     res.status(404).send({ message: "CANNOT FIND STUDENT" });
//   }
// });

// app.post("/students", (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
// });

// app.put("/students/:id", (req, res) => {
//   const { id } = req.params;
//   const updatedStudent = req.body;
//   const student = students.find((s) => s.id === Number(id));
//   console.log(student);
//   if (student) {
//     Object.keys(updatedStudent).forEach((key) => {
//       student[key] = updatedStudent[key];
//     });
//     // below for in loop does the same job
//     for (prop in updatedStudent) {
//       student[prop] = updatedStudent[prop];
//     }
//     res.send(student);
//   } else {
//     res.status(404).send({ message: "CANNOT FIND STUDENT" });
//   }
// });

// app.delete("/students/:id", (req, res) => {
//   const { id } = req.params;
//   const length = students.length;
//   students = students.filter((s) => s.id !== Number(id));
//   if (students.length < length) {
//     res.send("deleted");
//   } else {
//     res.status(404).send({ message: "CANNOT FIND STUDENT" });
//   }
// });
