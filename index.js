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

// start function after the connection is made
connection.connect(function (err) {
    if (err) throw err;

// prompt the user for their first input
function firstPrompt() {
    inquirer
      .prompt({
        type: "list",
        name: "task",
        message: "Would you like to do?",
        choices: [
          "View Employees",
          "View Employees by Department",
          // "View Employees by Manager",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          // "Remove Role",
          // "Update Employee Manager",
          "End",
        ],
      })
      .then(function ({ task }) {
        switch (task) {
          case "View Employees":
            viewEmployee();
            break;
          case "View Employees by Department":
            viewEmployeeByDepartment();
            break;
          // case "View Employees by Manager":
          //   viewEmployeeByManager();
          //   break;
          case "Add Employee":
            addEmployee();
            break;
          case "Remove Employees":
            removeEmployees();
            break;
          case "Update Employee Role":
            updateEmployeeRole();
            break;
          case "Add Role":
            addRole();
            break;
          // case "Remove Role":
          //   removeRole();
          //   break;
  
          // case "Update Employee MAnager":
          //   updateEmployeeManager();
          //   break;
  
          case "End":
            connection.end();
            break;
        }
      });
  }

  //////////////////========================= 1."View Employees"/ READ all, SELECT * FROM

  function viewEmployee() {
    console.log("Viewing employees\n");
  
    var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employee m
      ON m.id = e.manager_id`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
      console.log("Employees viewed!\n");
  
      firstPrompt();
    });
    // console.log(query.sql);
  }