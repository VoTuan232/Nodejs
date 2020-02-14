const express = require("express");
const router = express.Router();

const CarMarkerControll = require("../controllers/carMakers");
const checkAuth = require("../middleware/check-auth");

router.get("/", CarMarkerControll.getCarMakers);

module.exports = router;
