const { check, validationResult } = require("express-validator");

const BaseController = require("../base/baseController");
const connection = require("../database/connection");

class CarCertifyStyleController extends BaseController {
  getCarCertifyStyle(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Invalid validator!",
        errors: errors.array()
      });
    }
    if (!req.query.car_grade_style_id) {
      return res.status(422).json({
        message: "car_grade_style_id  is required!"
      });
    } else {
      const query =
        "SELECT * FROM car_certify_styles where car_grade_style_id = " +
        req.query.car_grade_style_id;
      connection.query(query, (err, data, fields) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "An error occurred while execute query to the DB",
            error: err
          });
        } else {
          res.status(200).json({
            message: "Get car_certify_style successfully!",
            carGradeStyles: data
          });
        }
      });
    }
  }
}

module.exports = CarCertifyStyleController;
