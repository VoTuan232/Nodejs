const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const CarMarkerCarNameController = new (require("../controllers/carMakerCarNames"))();
const checkAuth = require("../middleware/check-auth");

router.get("/", CarMarkerCarNameController.getCarMakerCarNames);

module.exports = router;
