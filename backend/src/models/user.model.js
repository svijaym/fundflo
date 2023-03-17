const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      max: 999,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    organization: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "https://i.ibb.co/VL94j8H/user.png",
    },
  },
  { timestamps: true }
);
const user = mongoose.model("user", userSchema);
module.exports = user
