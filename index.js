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

  //========================================= 2."View Employees by Department" / READ by, SELECT * FROM

  // Department array

  function viewEmployeeByDepartment() {
    console.log("Viewing employees by department\n");
  
    var query = `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    LEFT JOIN role r
      ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      // const departmentChoices = res.map(({ id, name }) => ({
      //   name: `${id} ${name}`,
      //   value: id
      // }));
  
      const departmentChoices = res.map((data) => ({
        value: data.id,
        name: data.name,
      }));
  
      console.table(res);
      console.log("Department view succeed!\n");
  
      promptDepartment(departmentChoices);
    });
    // console.log(query.sql);
  }  

// Choose the department and employees will populate

function promptDepartment(departmentChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you choose?",
        choices: departmentChoices,
      },
    ])
    .then(function (answer) {
      console.log("answer ", answer.departmentId);

      var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department 
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  WHERE d.id = ?`;

      connection.query(query, answer.departmentId, function (err, res) {
        if (err) throw err;

        console.table("response ", res);
        console.log(res.affectedRows + "Employees are viewed!\n");

        firstPrompt();
      });
    });
};

//========================================= 3."View Employees by Manager"

//========================================= 4."Add Employee" / CREATE: INSERT INTO

// Make a employee array


function addEmployee() {
    console.log("Inserting an employee!");
  
    var query = `SELECT r.id, r.title, r.salary 
        FROM role r`;
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id,
        title: `${title}`,
        salary: `${salary}`,
      }));
  
      console.table(res);
      console.log("RoleToInsert!");
  
      promptInsert(roleChoices);
    });
  }

  