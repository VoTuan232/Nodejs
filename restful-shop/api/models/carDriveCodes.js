const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const carDriveCodeSchema = mongoose.Schema({
  id: Number,
  code: Number,
  value: String
});

module.exports = mongoose.model("CarDriveCode", carDriveCodeSchema);
