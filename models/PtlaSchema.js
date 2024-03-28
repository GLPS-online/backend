const mongoose = require("mongoose");
const { Schema } = mongoose;

const ptlaSchema = new Schema(
  {
    user_id: {
      type: String,
      trim: true, //공백 제거
      unique: 1,
    },
    password: String,
    token: {
      type: String,
    },
    tokenExp: {
      type: Number, //토큰 유효기간
    },
    admin: {
      type: Number,
      enum: [0, 1, 2],
      required: false,
      default: 0,
    },

    //이상은 auth 관련정보

    korName: String,
    engName: String,
    wave: Number,
    gender: String,
    phone: String,
    division: {
      type: String,
      enum: ["PA", "LA", "TA", "HQ"],
      required: true,
    },
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

const Ptla = mongoose.model("ptlas", ptlaSchema, "ptlas");

module.exports = Ptla;
