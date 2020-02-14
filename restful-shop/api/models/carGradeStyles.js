const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const carGradeStyleSchema = mongoose.Schema({
  id: Number,
  code: Number,
  exhaust: Number,
  door: Number,
  capacityCode: String,
  bodypatternCode: Number,
  genericCodeCarDriveCodeId: Number,
  genericCodeCarFuelCodeId: Number,
  maxLoad: String,
  carGradeName: {
    id: Number,
    name: String
  }
});

module.exports = mongoose.model("CarGradeStyle", carGradeStyleSchema);
