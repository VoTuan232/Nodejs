const connection = require("../database/connection");
const ObjectUtil = require("../utils/object");

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

  transactions(errorCallback, successCallback, ...transactions) {
    transactions = ObjectUtil.convertKeyToSnakeCase(transactions);
    connection.beginTransaction(function(err) {
      if (err) {
        console.log("Error transaction!");
        throw err;
      }

      new BaseController().transaction(
        errorCallback,
        successCallback,
        transactions
      );
    });
  }

  transaction(errorCallback, successCallback, transactions, data = []) {
    connection.query(transactions[0].query, transactions[0].value, function(
      err,
      result
    ) {
      data.push(result);
      if (err) {
        connection.rollback(function() {
          errorCallback(err);
          throw err;
        });
      }
      transactions.shift();
      if (transactions.length === 0) {
        connection.commit(function(err) {
          if (err) {
            connection.rollback(function() {
              errorCallback(err);
              throw err;
            });
          }
          successCallback(data);
          console.log("Transaction success!");
        });
      } else {
        new BaseController().transaction(
          errorCallback,
          successCallback,
          transactions,
          data
        );
      }
    });
  }
}

module.exports = BaseController;
