const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const CarGradeStyleController = new (require("../controllers/carGradeStyles"))();
const checkAuth = require("../middleware/check-auth");

router.get("/", CarGradeStyleController.getCarGradeStyle);

module.exports = router;
