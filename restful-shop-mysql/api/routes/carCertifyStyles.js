const express = require("express");
const router = express.Router();
const CarCertifyStyleController = new (require("../controllers/carCertifyStyles"))();

router.get("/", CarCertifyStyleController.getCarCertifyStyle);

module.exports = router;
