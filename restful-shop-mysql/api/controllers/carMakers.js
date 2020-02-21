const BaseController = require("../base/baseController");
const { check, validationResult, body } = require("express-validator");

class CarMakerController extends BaseController {
  getCarMakers(req, res, next) {
    const query = "SELECT * FROM car_makers";

    super.select(
      query,
      err => {
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
  }

  getCarMakerById(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Invalid validator!",
        errors: errors.array()
      });
    }

    const id = req.params.id;
    const query = "SELECT * FROM car_makers WHERE id = " + id;

    super.select(
      query,
      err => {
        res.status(500).json({
          message: `Error get car maker by id = ${id} !`,
          error: err
        });
      },
      data => {
        res.status(200).json({
          message: `Get car maker by id = ${id} successs`,
          carMaker: data.map(item => {
            return {
              id: item.id,
              name: item.name
            };
          })
        });
      }
    );
  }
}

module.exports = new CarMakerController();
