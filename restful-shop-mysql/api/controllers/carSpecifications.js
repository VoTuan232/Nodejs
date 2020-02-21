const BaseController = require("../base/baseController");
const { check, validationResult, body } = require("express-validator");

const connection = require("../database/connection");

class CarSpecificationController extends BaseController {
  create(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Invalid validator!",
        errors: errors.array()
      });
    }

    const carSpecificaton = {
      id: null,
      carGradeStyleId: req.body.carGradeStyleId,
      genericCodeCarMileageUnitCodeId: req.body.genericCodeCarMileageUnitCodeId,
      carCategoryColorId: req.body.carCategoryColorId,
      genericCodeCarDriveCodeId: req.body.genericCodeCarDriveCodeId,
      genericCodeCarNavigationCodeId: req.body.genericCodeCarNavigationCodeId
    };
    // console.log(carSpecificaton);

    const query = "INSERT INTO car_specifications SET ?";

    super.insertOne(
      query,
      carSpecificaton,
      error => {
        res.status(500).json({
          message: "Error create car!",
          error: error
        });
      },
      data => {
        const id = data.insertId;
        const query =
          "SELECT * FROM car_specifications Where id = " + id + " LIMIT 1";

        super.select(
          query,
          err => {
            res.status(500).json({
              message: "Create car success but get data car failed!",
              error: err
            });
          },
          car => {
            car = car[0];

            res.status(200).json({
              message: "Create car successfully!",
              carSpecification: {
                id: car.id,
                carGradeStyleId: car.carGradeStyleId,
                genericCodeCarMileageUnitCodeId:
                  car.genericCodeCarMileageUnitCodeId,
                carCategoryColorId: car.carCategoryColorId,
                genericCodeCarDriveCodeId: car.genericCodeCarDriveCodeId,
                genericCodeCarNavigationCodeId:
                  car.genericCodeCarNavigationCodeId
              }
            });
          }
        );
      }
    );
  }
}

module.exports = new CarSpecificationController();
