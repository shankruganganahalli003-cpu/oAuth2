const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("DB Error:", err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
