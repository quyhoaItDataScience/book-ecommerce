const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log("db connected");
};

module.exports = connectDB;
