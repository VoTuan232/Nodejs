const BaseController = require("../base/baseController");
class CarMakerController extends BaseController {
  getCarMakers(req, res, next) {
    const query = "SELECT * FROM car_makers";

    super.select(
      "SELECT * FROM car_makers",
      error => {
        res.status(500).json({
          message: "Error get all car marker!",
          error: err
        });
      },
      data => {
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
    );
    // connection.query(query, (err, data) => {
    //   if (err) {
    //     res.status(500).json({
    //       message: "Error get all car marker!",
    //       error: err
    //     });
    //   } else {
    //     res.status(200).json({
    //       message: "Get all car maker successfully!",
    //       carMarkers: data.map(item => {
    //         return {
    //           id: item.id,
    //           name: item.name
    //         };
    //       })
    //     });
    //   }
    // });
  }
}

module.exports = CarMakerController;
