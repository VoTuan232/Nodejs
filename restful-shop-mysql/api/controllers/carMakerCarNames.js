const { check, validationResult } = require("express-validator");

const CarMarkerCarName = require("../models/carMakerCarNames");
const connection = require("../database/connection");
const AbstractBaseController = new (require("../base/baseController"))();

// class CarMakerCarNameController extends AbstractBaseController {}

exports.getCarMakerCarNames = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid validator!",
      errors: errors.array()
    });
  }
  if (!req.query.car_maker_id) {
    return res.status(422).json({
      message: "car_maker_id  is required!"
    });
  } else {
    const query =
      "SELECT * FROM car_maker_car_names where car_maker_id = " +
      req.query.car_maker_id;
    connection.query(query, (err, data, fields) => {
      if (err) {
        console.log(err);
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
};
