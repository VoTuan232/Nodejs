const BaseController = require("../base/baseController");
const { check, validationResult, body } = require("express-validator");

const connection = require("../database/connection");
const ObjectUtil = require("../utils/object");
class CarSpecificationController extends BaseController {
  create(req, res, next) {
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

    super.transactionsNested(
      err => {
        res.status(500).json({
          message: "Errors transaction when create car specification",
          errors: err
        });
      },
      data => {
        const carSpecificationId = data[0].insertId;
        const queryCarSpecification =
          "SELECT car_specifications.id, car_grade_name FROM car_specifications, car_grade_styles WHERE car_specifications.car_grade_style_id = car_grade_styles.car_grade_id AND car_specifications.id = " +
          carSpecificationId +
          " LIMIT 1";
        const carTradeId = data[1].insertId;
        const queryCarTrade =
          "SELECT * FROM car_trades WHERE car_trades.id = " +
          carTradeId +
          " LIMIT 1";

        super.multiSelect(
          err => {
            res.status(500).json({
              message: "Error select!",
              error: err
            });
          },
          data => {
            // const car = data[0];
            res.status(201).json({
              message: "Transaction success when create car specification",
              carSpecification: data[0][0],
              carTrade: data[1][0]
            });
          },
          queryCarSpecification,
          queryCarTrade
        );
      },
      {
        query: "INSERT INTO car_specifications SET ?",
        value: carSpecificaton,
        success: data => {
          const carSpecificationId = data.insertId;
          const carTrade = {
            id: null,
            carSpecificationId
          };
          return { query: "INSERT INTO car_trades SET ?", value: carTrade };
        }
      }
    );
  }
}

module.exports = new CarSpecificationController();
