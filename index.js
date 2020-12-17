// require npms
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// connection to mysql server & db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Wilder3114!",
  database: "employeesDB",
});
