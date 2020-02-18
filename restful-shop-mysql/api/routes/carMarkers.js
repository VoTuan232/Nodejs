const express = require("express");
const router = express.Router();

const CarMarkerController = new (require("../controllers/carMakers"))();
const checkAuth = require("../middleware/check-auth");

router.get("/", CarMarkerController.getCarMakers);

module.exports = router;
