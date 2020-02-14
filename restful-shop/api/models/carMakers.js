const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const carMakerSchema = mongoose.Schema({
  id: Number,
  name: String
});

module.exports = mongoose.model("CarMaker", carMakerSchema);
