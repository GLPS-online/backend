require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json({ limit: "50mb" })); // 미들웨어, 바디로 온 json을 전처리해줌

const studentRoute = require("./routes/students");
const ptlaRoute = require("./routes/ptlas");
const timetableRoute = require("./routes/timetables");

// 로컬에서 개발할 때 CORS에러 방지
// deploy 이후 삭제 필요
const cors = require("cors");
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    preflightContinue: true,
  })
);

app.use("/students", studentRoute);
app.use("/ptlas", ptlaRoute);
app.use("/timetables", timetableRoute);

const start = async () => {
  try {
    const mongoid = process.env.MONGO_ID;
    const mongopw = process.env.MONGO_PW;
    await mongoose.connect(
      `mongodb+srv://${mongoid}:${mongopw}@cluster0.odlbq4i.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: `glps`,
      }
    );
    app.listen(443, () => console.log("Server started on port 443"));
  } catch (error) {
    console.log(error);
    // process.exit(1);
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
