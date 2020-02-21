const {
  check,
  validationResult,
  body,
  param,
  query
} = require("express-validator");
const _ = require("lodash");
class Validation {
  bodyExists(fields) {
    let result = [];
    for (let key in fields) {
      result.push(
        body(fields[key], `${_.snakeCase(fields[key])} is required!`).exists()
      );
    }

    return result;
  }

  queryExists(fields) {
    let result = [];
    for (let key in fields) {
      result.push(
        query(fields[key], `${_.snakeCase(fields[key])} is required!`).exists()
      );
    }

    return result;
  }

  paramExists(fields) {
    let result = [];
    for (let key in fields) {
      result.push(
        param(fields[key], `${_.snakeCase(fields[key])} is required!`).exists()
      );
    }

    return result;
  }
}

module.exports = new Validation();
