const mongoose = require("mongoose");

const CarMarker = require("../models/carMakers");

exports.getCarMakers = (req, res, next) => {
  CarMarker.find()
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Get all car maker successfully!",
        carMarkers: result.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error get all car marker!",
        error: err
      });
    });
};
