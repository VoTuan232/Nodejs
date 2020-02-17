const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const carTransmissionCodeSchema = mongoose.Schema({
  id: Number,
  code: Number,
  value: String
});

module.exports = mongoose.model(
  "CarTransmissionCode",
  carTransmissionCodeSchema
);
