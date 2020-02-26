const BaseController = require("../base/baseController");
const { check, validationResult, body } = require("express-validator");

const connection = require("../database/connection");
const ObjectUtil = require("../utils/object");
class CarSpecificationController extends BaseController {
  createWidthTransaction(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Invalid validator!",
        errors: errors.array()
      });
    }

    let carSpecificaton = {
      id: null,
      carGradeStyleId: req.body.carGradeStyleId,
      genericCodeCarMileageUnitCodeId: req.body.genericCodeCarMileageUnitCodeId,
      carCategoryColorId: req.body.carCategoryColorId,
      genericCodeCarDriveCodeId: req.body.genericCodeCarDriveCodeId,
      genericCodeCarNavigationCodeId: req.body.genericCodeCarNavigationCodeId
    };

    // let carSpecificaton2 = {
    //   id: null,
    //   carGradeStyleId: req.body.carGradeStyleId,
    //   genericCodeCarMileageUnitCodeId: req.body.genericCodeCarMileageUnitCodeId,
    //   carCategoryColorId: req.body.carCategoryColorId,
    //   genericCodeCarDriveCodeId: req.body.genericCodeCarDriveCodeId,
    //   genericCodeCarNavigationCodeId: req.body.genericCodeCarNavigationCodeId
    // };

    super.transactions(
      err => {
        res.status(500).json({
          message: "Errors transaction when create car specification",
          errors: err
        });
      },
      data => {
        // console.log(data);
        const carSpecificationId = data[0].insertId;
        const query =
          "SELECT * FROM car_specifications, car_grade_styles WHERE car_specifications.car_grade_style_id = car_grade_styles.car_grade_id AND car_specifications.id = " +
          carSpecificationId +
          " LIMIT 1";

        super.select(
          query,
          err => {
            res.status(500).json({
              message: "Error create car!",
              error: err
            });
          },
          data => {
            const car = data[0];
            res.status(201).json({
              message: "Transaction success when create car specification",
              carSpecification: car
            });
          }
        );
      },
      {
        query: "INSERT INTO car_specifications SET ?",
        value: carSpecificaton
      },
      { query: "INSERT INTO car_specification1s SET ?", value: carSpecificaton }
    );
  }

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
