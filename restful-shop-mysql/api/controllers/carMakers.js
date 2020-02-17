const connection = require("../database/connection");
const AbstractBaseController = require("../base/baseController");

class CarMakerController extends AbstractBaseController {
  getCarMakers(req, res, next) {
    const query = "SELECT * FROM car_makers";
    connection.query(query, (err, data) => {
      if (err) {
        res.status(500).json({
          message: "Error get all car marker!",
          error: err
        });
      } else {
        res.status(200).json({
          message: "Get all car maker successfully!",
          carMarkers: data.map(item => {
            return {
              id: item.id,
              name: item.name
            };
          })
        });
      }
    });
  };
}

module.exports = CarMakerController;