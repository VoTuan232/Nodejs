const mysql = require("mysql");
const util = require("util");
const config = require("../config/config");

var pool = mysql.createPool({
  connectionLimit: 100,
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.log("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.log("Database connection was refused.");
    }
    if (connection) {
      connection.release();
    }
    return;
  } else {
    console.log("Database connection successfully!");
  }
});

pool.query = util.promisify(pool.query); // Magic happens here.

module.exports = pool; //export the pool variable for globally use

// const options = {
//   host: "localhost",
//   user: "root",
//   password: "votuan883279",
//   database: "carseru"
// };
// const connection = mysql.createConnection(options);

// module.exports = connection;
