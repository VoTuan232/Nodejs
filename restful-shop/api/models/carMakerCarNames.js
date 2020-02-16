const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const carMarkerCarNameSchema = mongoose.Schema({
  id: Number,
  carBodyKindId: Number,
  carMakerCarKindId: Number,
  name: String,
  carMakerId: Number,
});

module.exports = mongoose.model("CarMakerCarName", carMarkerCarNameSchema);