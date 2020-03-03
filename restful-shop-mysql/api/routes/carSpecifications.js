const express = require("express");
const router = express.Router();

const CarSpecificationController = require("../controllers/carSpecifications");
const validation = require("../validation/common");

router.post(
  "/",
  validation.bodyExists([
    "carGradeStyleId",
    "genericCodeCarDriveCodeId",
    "genericCodeCarMileageUnitCodeId",
    "carCategoryColorId",
    "genericCodeCarNavigationCodeId"
  ]),
  CarSpecificationController.create
);

module.exports = router;
