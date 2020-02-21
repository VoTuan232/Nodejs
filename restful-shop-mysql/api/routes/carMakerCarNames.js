const express = require("express");
const router = express.Router();
const {
  check,
  validationResult,
  body,
  param,
  query
} = require("express-validator");

const CarMarkerCarNameController = require("../controllers/carMakerCarNames");
const checkAuth = require("../middleware/check-auth");
const validation = require("../validation/common");

router.get(
  "/",
  validation.queryExists(["carMakerId"]),
  CarMarkerCarNameController.get
);

module.exports = router;
