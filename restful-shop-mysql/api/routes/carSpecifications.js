const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");

const CarSpecificationController = new (require("../controllers/carSpecifications"))();

router.post(
  "/",
  [
    check("carGradeStyleId")
      .exists()
      .withMessage("car_grade_style_id is required!"),
    check("genericCodeCarDriveCodeId")
      .exists()
      .withMessage("generic_code_car_drive_code_id is required!"),
    check("genericCodeCarMileageUnitCodeId")
      .exists()
      .withMessage("generic_code_car_mileage_unit_code_id is required!"),
    check("carCategoryColorId")
      .exists()
      .withMessage("car_category_color_id is required!"),
    check("genericCodeCarNavigationCodeId")
      .exists()
      .withMessage("generic_code_car_navigation_code_id is required!")
  ],
  CarSpecificationController.create
);

module.exports = router;
