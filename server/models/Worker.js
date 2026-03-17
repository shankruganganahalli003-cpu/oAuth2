const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name:String,
  desc:String,
  gender: String,
  dob: String,
  phone: String,
  location: String,
  skills: String,
  country: String,
  state: String,
  city: String,
  image:String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Worker", workerSchema);