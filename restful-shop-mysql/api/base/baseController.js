const connection = require("../database/connection");

class BaseController {
  constructor() {
    // console.log("controller");
  }

  select(query, errorCallback, successCallback) {
    connection.query(query, (err, data) => {
      if (err) {
        errorCallback();
      } else {
        successCallback(data);
      }
    });
  }
}

module.exports = BaseController;
