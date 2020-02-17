const mongoose = require("mongoose");

// const Schema = mongoose.Schema,
//   ObjectId = Schema.ObjectId;
const carCategoryColorSchema = mongoose.Schema({
  id: Number,
  name: String
});

module.exports = mongoose.model("CarCategoryColor", carCategoryColorSchema);
