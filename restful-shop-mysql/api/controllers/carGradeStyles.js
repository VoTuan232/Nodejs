const { check, validationResult } = require("express-validator");

const connection = require("../database/connection");
const BaseController = require("../base/baseController");

class CarGradeStyleController extends BaseController {
  getCarGradeStyle(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Invalid validator!",
        errors: errors.array()
      });
    }
    if (!req.query.car_maker_car_name_id) {
      return res.status(422).json({
        message: "car_maker_car_name_id  is required!"
      });
    } else {
      const query =
        "SELECT * FROM car_grade_styles where car_maker_car_name_id = " +
        req.query.car_maker_car_name_id;
      connection.query(query, (err, data, fields) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "An error occurred while execute query to the DB",
            error: err
          });
        } else {
          res.status(200).json({
            message: "Get car_grade_style successfully!",
            carGradeStyles: data
          });
        }
      });
    }
  }
}

module.exports = CarGradeStyleController;
