const express = require("express");
const router = express.Router();

const CarCategoryColorController = new (require("../controllers/carCategoryColors"))();

router.get("/", CarCategoryColorController.getColors);

module.exports = router;
