const { check, validationResult } = require("express-validator");

const connection = require("../database/connection");
const BaseController = require("../base/baseController");

class CarMakerCarNameController extends BaseController {
  get(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Invalid validator!",
        errors: errors.array()
      });
    }
    const query =
      "SELECT * FROM car_maker_car_names WHERE car_maker_id = " +
      req.query.carMakerId;
    connection.query(query, (err, data, fields) => {
      if (err) {
        res.status(500).json({
          message: "An error occurred while execute query to the DB",
          error: err
        });
      } else {
        res.status(200).json({
          message: "Get car_maker_car_name successfully!",
          carMakerCarNames: data
        });
      }
    });
  }
}

module.exports = new CarMakerCarNameController();
