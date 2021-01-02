USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Human Resources"), ("Legal"), ("Finance"), ("Artist");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", "100000", "1"), ("Software Developer", "70000", "2"), ("Recruiter", "60000", "3"), ("Lawyer", "60000", "4"), ("Actuary", "60000", "5"), ("Artist", "70000", "6"), ("Salesperson", "40000", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Marion", "Knight", "1", "1"), ("Bill", "Gates", "2", "1"), ("Rob", "Robson", "3", "1"), ("Ted", "Tenderoni", "4", "3"), ("Cisar", "Sarabius", "5", "1"), ("Tupac", "Shakur", "6", "1"), ("Jordan", "Belfort", "1", "1");
-- Query for view all --
SELECT e.id, e.first_name, e.last_name, d.name AS department, r.title, r.salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id ASC;

-- Query for view all roles --
SELECT  r.id, r.title, r.salary, d.name as Department_Name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id;

-- Query for getting employees --
SELECT id, CONCAT_WS(" ", first_name, last_name) AS Employee_Name FROM employee;

-- Query for updating --
UPDATE employee SET role_id = 3 WHERE id = 8;

-- Query for Delete --
DELETE FROM department WHERE id = 13;