const connection = require("../database/connection");
const ObjectUtil = new (require("../utils/object"))();

class BaseController {
  constructor() {
    // console.log("controller");
  }

  select(query, errorCallback, successCallback) {
    connection.query(query, (err, data) => {
      if (err) {
        errorCallback(err);
      } else {
        // successCallback(data);
        successCallback(ObjectUtil.convertKeyToCamelCase(data));
      }
    });
  }

  insertOne(query, data, errorCallback, successCallback) {
    data = ObjectUtil.convertKeyToSnakeCase(data);
    connection.query(query, data, (err, data) => {
      if (err) {
        errorCallback(err);
      } else {
        // successCallback(data);
        console.log();
        successCallback(ObjectUtil.convertKeyToCamelCase(data));
      }
    });
  }
}

module.exports = BaseController;
