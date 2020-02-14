const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const CarMarkerCarName = require("../models/carMarkerCarNames");

exports.getCarMakerCarNames = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid validator!",
      errors: errors.array()
    });
  }
  console.log(req.query); // convert here!
  if (!req.query.car_maker_car_name[car_maker_id]) {
    return res.status(422).json({
      message: "car_maker_car_name[car_maker_id]  is required!"
    });
  } else {
  }

  // CarMarker.find()
  //   .exec()
  //   .then(result => {
  //     res.status(200).json({
  //       message: "Get all car maker successfully!",
  //       carMarkers: result.map(item => {
  //         return {
  //           id: item.id,
  //           name: item.name
  //         };
  //       })
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({
  //       message: "Error get all car marker!",
  //       error: err
  //     });
  //   });
};
