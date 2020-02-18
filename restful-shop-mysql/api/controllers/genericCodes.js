const { check, validationResult } = require("express-validator");

const connection = require("../database/connection");
const BaseController = require("../base/baseController");

class GenericCodeController extends BaseController {
  getGenericCodes(req, res, body) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Invalid validator!",
        errors: errors.array()
      });
    }
    if (!req.query.type) {
      return res.status(422).json({
        message: "type  is required!"
      });
    } else {
      const query =
        "SELECT * FROM generic_codes where type like " +
        "'" +
        req.query.type +
        "'";
      connection.query(query, (err, data, fields) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: "An error occurred while execute query to the DB",
            error: err
          });
        } else {
          res.status(200).json({
            message: `Get generic code ${req.query.type} successfully!`,
            genericeCodes: data
          });
        }
      });
    }
  }
}

module.exports = GenericCodeController;
