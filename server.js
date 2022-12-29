const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

// mySQL connection
var connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Elemental451#!',
        database: 'employee_db'
    },
    console.log('Connected to the election database.')
    );

// mySQL function connection
connection.connect(function (err) {
    if (err) throw err;
    listQuestions();
    });

// list of questions
function listQuestions() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View all Departments",
            "View all Employees",
            "View all Roles",
            "Add a Department",
            "Add an Employee",
            "Add a Role",
            "Update Tables",
            "Update Employee Role",
            "EXIT"
            ]  
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "View all Departments": 
                viewDepartments() 
                break;
            case "View all Employees": 
                viewEmployees()
                break;
            case "View all Roles": 
                viewRoles()
                break;
            case "Add a Department": 
                addDepartments()
                break;
            case "Add an Employee": 
                addEmployees()
                break;
            case "Add a Role": 
                addRole()
                break;
            case "Update Tables": 
                updateTable()
                break;
            case "Update Employee Role": 
                updateEmployeeRole()
                break;
            default: 
                connection.end() 
                break;
            }
        }) 
    };

// Function -> view departments
function viewDepartments() {
    const sql = `SELECT * FROM department`
    connection.query(sql, function (err, data) {
        console.table(data);
        listQuestions();
        })
    };

// Function -> view roles
function viewRoles() {
    const sql = `SELECT roles.title AS TITLE, roles.salary, department.area FROM roles 
        LEFT JOIN department ON roles.department_id = department.id`
    connection.query(sql, function(err, data) {
        console.table(data);
        listQuestions();
        })
    };

// Function -> view employees
function viewEmployees() {
    const sql = `SELECT e.first_name, e.last_name, roles.title, roles.salary, emp.first_name AS manager_name FROM employees AS e 
    LEFT JOIN roles ON e.role_id = roles.id
    LEFT JOIN employees AS emp ON emp.id = e.manager_id`
    connection.query(sql, function(err, data) {
        console.table(data);
        listQuestions();
        })
    };

// Function -> add a department
function addDepartments() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Please state department name"
    }).then(function(res) {
        const sql =`INSERT INTO department (area) VALUES (?)`
        connection.query(sql, [res.department], function(err, data) {
            if (err) throw err;
            console.table("Department successfully added");
            listQuestions();
            })
        })
    };

// Function -> add a new employee
function addEmployees() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What's the new employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What's the new employee's last name?"
        },
        {
            type: "number",
            name: "roleID",
            message: "What's the new employee's role ID?"
        },
        {
            type: "number",
            name: "managerID",
            message: "What's the new employee's manager ID?"
        }
    ]).then(function(res) {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        connection.query(sql, [res.firstName, res.lastName, res.roleID, res.managerID], function(err, data) {
            if (err) throw err;
            console.table("Employee successfully added");
            listQuestions();
            })
        })
    };
    
// Function -> add new role
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter role name"
        },
        {
            type: "number",
            name: "salary",
            message: "Enter salary"
        },
        {
            type: "number",
            name: "department_id",
            message: "Enter department ID"
        }
    ]).then(function(res) {
        const sql = `INSERT INTO roles (title, salary, department_id) values (?, ?, ?)`
        connection.query(sql, [res.title, res.salary, res.department_id], function (err, data) {
            console.table(data);
            })
        listQuestions();
        })
    };

// Function -> update tables
function updateTable() {
    const sqldb = `SOURCE db/db.sql`
    const sqlschema = `SOURCE db/db.schema.sql`
    const sqlseeds = `SOURCE db/db.seeds.sql`
    connection.query(sqldb)
    connection.query(sqlschema)
    connection.query(sqlseeds)
    }

// Function -> update employee role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "role_name",
            message: "Which employee would you like to update (first name)?"
        },
        {
            type: "number",
            name: "role_id",
            message: "Enter the new role ID"
        }
    ]).then(function(res) {
        const sql = `UPDATE employees SET role_id = ? WHERE first_name = ?`
        connection.query(sql, [res.role_id, res.role_name], function (err, data) {
            console.table(data);
            })
        listQuestions();
        })
    }

