const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true, //공백 제거
      unique: true,
    },
    password: String,
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
    position: { type: String, required: false, default: 9999 },
    // glps-coordinator, pa-class4, pa-computer, ta-rp, la-health-m

    sortOrder: Number,
    area: {
      type: String,
      // TA의 경우: 맡은 교실 D-207
      // LA의 경우: 맡은 층 dorm-7
      // 해당사항 없는 경우: ""
      required: false,
      default: "",
    },
    roomNum: Number,
    club: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: { updatedAt: "updated_at" } }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// userSchema.methods.comparePassword = async (password) => {
//   return bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateToken = async () => {
//   let user = this;
//   let token = jwt.sign(user._id.toHexString(), "randomToken", {
//     expiresIn: "24 hour",
//   });
//   user.token = token;
//   const newUser = await user.save();
//   return newUser;
// };

const User = mongoose.model("users", userSchema, "users");

module.exports = User;
