const mysql = require("mysql");

const options = {
  host: "localhost",
  user: "root",
  password: "votuan883279",
  database: "carseru"
};
const connection = mysql.createConnection(options);

module.exports = connection;
