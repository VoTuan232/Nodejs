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

  multiSelect(errorCallback, successCallback, ...query) {
    connection.beginTransaction(function(err) {
      if (err) {
        console.log("Error Multiple select!");
        throw err;
      }

      new BaseController().multiSelectItem(
        errorCallback,
        successCallback,
        query
      );
    });
  }

  multiSelectItem(errorCallback, successCallback, query, data = []) {
    connection.query(query[0], (err, result) => {
      if (err) {
        connection.rollback(function() {
          errorCallback(err);
          throw err;
        });
      } else {
        data.push(result);
        query.shift();
        if (query.length === 0) {
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
          new BaseController().multiSelectItem(
            errorCallback,
            successCallback,
            query,
            data
          );
        }
      }
    });
  }

  insertOne(query, data, errorCallback, successCallback) {
    data = ObjectUtil.convertKeyToSnakeCase(data);
    connection.query(query, data, (err, data) => {
      if (err) {
        errorCallback(err);
      } else {
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

      new BaseController().transactionItem(
        errorCallback,
        successCallback,
        transactions
      );
    });
  }

  transactionItem(errorCallback, successCallback, transactions, data = []) {
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
        new BaseController().transactionItem(
          errorCallback,
          successCallback,
          transactions,
          data
        );
      }
    });
  }

  transactionsNested(errorCallback, successCallback, transactions) {
    connection.beginTransaction(function(err) {
      if (err) {
        console.log("Error transaction!");
        throw err;
      }

      new BaseController().transactionNestedItem(
        errorCallback,
        successCallback,
        transactions
      );
    });
  }

  transactionNestedItem(
    errorCallback,
    successCallback,
    transactions,
    data = []
  ) {
    connection.query(
      transactions.query,
      ObjectUtil.convertKeyToSnakeCase(transactions.value),
      function(err, result) {
        data.push(result);
        if (err) {
          connection.rollback(function() {
            errorCallback(err);
            throw err;
          });
        }
        if (!transactions.success) {
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
          new BaseController().transactionNestedItem(
            errorCallback,
            successCallback,
            transactions.success(result),
            data
          );
        }
      }
    );
  }
}

module.exports = BaseController;
