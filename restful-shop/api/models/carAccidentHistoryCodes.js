const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
const carAccidentHistoryCodeSchema = mongoose.Schema({
  id: Number,
  code: Number,
  value: String
});

module.exports = mongoose.model(
  "CarAccidentHistoryCode",
  carAccidentHistoryCodeSchema
);
