const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Vô danh",
  },
  username: {
    type: String,
    required: [true, "Username bắt buộc"],
    min: [6, "Ít nhất 6 ký tự"],
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CloudinaryImage",
    default: null,
  },
  orderCount: {
    type: Number,
    default: 0,
  },
  ipAddress: {
    type: String,
    default: "127.0.0.1",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
