require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json({ limit: "50mb" })); // 미들웨어, 바디로 온 json을 전처리해줌

const authRoute = require("./routes/auth");
const studentRoute = require("./routes/students");
const userRoute = require("./routes/users");
const timetableRoute = require("./routes/timetables");
const clubRoute = require("./routes/clubs");
const actionRoute = require("./routes/actions");
const mealRoute = require("./routes/meals");

const cors = require("cors");
app.use(
  cors({
    origin: true,
    allowedHeaders: ["Authorization", "Content-type"],
    preflightContinue: true,
  })
);
app.options(
  "*",
  cors({
    origin: true,
    allowedHeaders: ["Authorization", "Content-type"],
    preflightContinue: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "WELCOME TO GLPS ONLINE BACKEND SERVER" });
});
app.use("/auth", authRoute);
app.use("/students", studentRoute);
app.use("/users", userRoute);
app.use("/timetables", timetableRoute);
app.use("/clubs", clubRoute);
app.use("/cards", timetableRoute);
app.use("/actions", actionRoute);
app.use("/meals", mealRoute);

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
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};

start();
