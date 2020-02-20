const BaseController = require("../base/baseController");

class CarCategoryColorController extends BaseController {
  getColors(req, res, next) {
    const query = "SELECT * FROM car_category_colors";

    super.select(
      query,
      err => {
        res.status(500).json({
          message: "Get all color failed!",
          errors: err
        });
      },
      data => {
        res.status(200).json({
          message: "Get all color successfully!",
          colors: data.map(item => {
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

module.exports = CarCategoryColorController;
