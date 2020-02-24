const express = require("express");
const router = express.Router();

const base = require("../config/config").baseUrl;

const productRoutes = require("./products");
const orderRoutes = require("./orders");
const userRoutes = require("./users");
const carMarkerRoutes = require("./carMarkers");
const carMarkerCarNameRoutes = require("./carMakerCarNames");
const carGradeStyleRoutes = require("./carGradeStyles");
const carCertifyStyles = require("./carCertifyStyles");
const genericCodes = require("./genericCodes");
const carSpecifications = require("./carSpecifications");
const carCategoryColors = require("./carCategoryColor");

module.exports = app => {
  app.use(`${base}/products`, productRoutes);
  app.use(`${base}/orders`, orderRoutes);
  app.use(`${base}/user`, userRoutes);
  app.use(`${base}/car_makers`, carMarkerRoutes);
  app.use(`${base}/car_maker_car_names`, carMarkerCarNameRoutes);
  app.use(`${base}/car_grade_styles`, carGradeStyleRoutes);
  app.use(`${base}/car_certify_styles`, carCertifyStyles);
  app.use(`${base}/generic_codes`, genericCodes);
  app.use(`${base}/car_specifications`, carSpecifications);
  app.use(`${base}/car_category_colors`, carCategoryColors);
};
