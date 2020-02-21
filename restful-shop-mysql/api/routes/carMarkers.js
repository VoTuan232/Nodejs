const express = require("express");
const router = express.Router();

const CarMarkerController = require("../controllers/carMakers");
const checkAuth = require("../middleware/check-auth");

router.get("/", CarMarkerController.getCarMakers);

router.get("/:id", CarMarkerController.getCarMakerById);

module.exports = router;
