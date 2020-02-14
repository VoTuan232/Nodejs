const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const carMileageUnitCodeSchema = mongoose.Schema({
  id: Number,
  code: Number,
  value: String
});

module.exports = mongoose.model("CarMileageUnitCode", carMileageUnitCodeSchema);
