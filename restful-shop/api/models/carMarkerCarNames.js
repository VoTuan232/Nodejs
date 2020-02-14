const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const carMarkerCarNameSchema = mongoose.Schema({
  id: Number,
  carBodyKindId: Number,
  carMakerCarKindId: Number,
  name: String
});

module.exports = mongoose.model("CarMarkerCarName", carMarkerCarNameSchema);
