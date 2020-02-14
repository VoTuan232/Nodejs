const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const CarMarkerCarNameController = require("../controllers/carMarkerCarNames");
const checkAuth = require("../middleware/check-auth");

router.get("/", CarMarkerCarNameController.getCarMakerCarNames);

module.exports = router;
