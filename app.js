//Dependencies
const inquirer = require("inquirer"); 
const mysql = require("mysql"); 
const consoleTable = require("console.table");
const colors = require("colors"); 
const env = require("dotenv").config();
const figlet = require('figlet'); 
colors.enable(); 

//Defining the environmental variable
//this is stored in a .env file which is in the gitignore too. 
let password = process.env.PASSWORD

//Establishing mysql connection
//password variable used. 
var connect = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root", 
    password: password,
    database: "employee_management"
})

//Figlet is an npm package for generating text in the terminal. 
figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

//If the connection is successful then the the launchApp function will be good. 
//Also the npm colors package is used. See line 39. 
connect.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connect.threadId + "\n");
    console.log(colors.red("Time to track some employees")); 
    launchApp();  
})

//This is the launchApp function
//The user is given a choice. 
//Depending on their choice an async function will start. 
//At the end of that async function the launchAPP function will be called again. 
function launchApp(){
    console.log("App Launched"); 
    inquirer.prompt({
        name: "launch",
        type: "list", 
        message: "Please choose an option:",
        choices: [
            "Add a department",
            "Add a role",
            "Add an employee",
            "View a department",
            "View all departments",
            "View a role",
            "View employees",
            "Update an employee role", ],     
    }).then(({ launch}) => {
        switch (launch) {
            case "Add a department":
                //console.log("Add a department")
                addDepartment(); 
            break; 
            case "Add a role":
                //console.log("Add a role")
                addRole(); 
            break; 
            case "Add an employee":
                //console.log("Add an employee")
                addEmployee(); 
            break; 
            case "View a department":
                //console.log("View a department")
                viewDeaprtment(); 
            break; 
            case "View all departments":
                //console.log("View all");
                viewAllDepartments(); 
            break; 
            case "View a role":
                //console.log("View a role")
                viewRole(); 
            break; 
            case "View employees":
                //console.log("View an employee")
                viewEmployees(); 
            break; 
            case "Update an employee role":
                //console.log("Update an employee role")
                updateEmployee(); 
            break; 
        }
    });
}; 

//This is a basic function for viewing all the employees 
//It selects all from the employee table. 
//Calls launchApp function at the end. 
function viewEmployees() {
    connect.query(
      "SELECT * FROM employee",
      function (err, res) {
        if (err) throw err;
        console.log("----------------------------------------------------");
        console.table(res);
        launchApp();
      }
    );
}

//This async function allows the user to view employees by department. 
//There is an inquirer function that allows them to choose. 
//Then the database is queried depending on their choice. 
//The launchApp function is then called at the end of the function. 
async function viewDeaprtment(){
    inquirer.prompt([
        {
            message: "What would you like to view?",
            choices: ["Boss Department", "Middle Department", "Workers"],
            name: "Departments",
            type: "list"
        }
    ]).then((answer) => {
     console.log("You are Viewing the ", answer.Departments); 
     let query = "SELECT e.first_name, e.last_name, r.title, d.name FROM employee e INNER JOIN roles r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id WHERE d.name = ?"
     connect.query(query, [answer.Departments], 
     function(err, res){
         if(err) throw err; 
         console.log("-----------------------------");
         console.table(res); 
         launchApp();
     })
})}; 

//this is a function to view all departments. 
//I added this so that users could view departments they have added. 
function viewAllDepartments() {
    connect.query(
      "SELECT * FROM department",
      function (err, res) {
        if (err) throw err;
        console.log("----------------------------------------------------");
        console.table(res);
        launchApp();
      }
    );
}


//This async function allows the user to view employees by role. 
//There is an inquirer function that allows them to choose. 
//Then the database is queried depending on their choice. 
//The launchApp function is then called at the end of the function. 
async function viewRole(){
    inquirer.prompt([
        {
            message: "What would you like to view?",
            choices: ["Da Boss", "Da Lil Boss", "Worker1", "Worker1"],
            name: "Roles",
            type: "list"
        }
    ]).then((answer) => {
     console.log("You are Viewing the ", answer.Roles); 
     let query = "SELECT employee.first_name, employee.last_name FROM employee INNER JOIN roles ON employee.role_id = roles.id WHERE roles.title = ?  "
     connect.query(query, [answer.Roles], 
     function(err, res){
         if(err) throw err; 
         console.log("-----------------------------");
         console.table(res); 
         launchApp();
     })
})}; 

//This is function allows users to add deprtments to the database. 
async function addDepartment(){
    //console.log("We are adding a department")
     inquirer.prompt([
        {
            name: "name",
            type: "input", 
            message: "What department do you want to add?"
        },
    ]).then((input) =>{
        console.log(input.name);
        let query = "INSERT INTO department SET ?";
        connect.query(query,[{name: input.name}]); 
        launchApp();
    }) 
}; 

//This is function allows users to add deprtments to the database. 
function addRole(){
    inquirer.prompt(
        [{
            name: "roleTitle",
            type: "input",
            message: "What is the title for this role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "departmentID",
            type: "input",
            message: "What is the departmentID for this role?"
        }
    ]
    ).then(function(answer){
        console.log(answer)
        connect.query(
            "INSERT INTO roles SET ?",
            {
            title: answer.roleTitle,
            salary: answer.salary,
            department_id: answer.departmentID,
            },
            function (err) {
                if(err)throw(err);
                console.log("done"); 
                launchApp(); 
            },
        )
    });
};

function addEmployee(){
    inquirer.prompt([
        {
            name: "first",
            type: "input",
            message: "What is the first name of your employee?"
        },
        {
            name: "last",
            type: "input",
            message: "What is the last name of your employee?"
        },
        {
            name: "role",
            type: "input",
            message: "What is the role id of your employee?"
        },
        {
            name: "Manager",
            type: "input",
            message: "What is the manager id of this employee?"
        },
    ]).then(function(answer){
     connect.query(
         "INSERT INTO employee SET ?",
         {
             first_name: answer.first,
             last_name: answer.last,
             role_id: answer.role,
             manager_id: answer.Manager
         },
         function (err) {
            if(err)throw(err);
            console.log("done"); 
            launchApp(); 
        },
     )})
}; 

function updateEmployee(){
    console.log("update");
    employeeList().then(function(list){
        console.log("list", list[0])
        for(var i = 0; i < list.length; i++){
            var name = list[i].first_name; 
            console.log(name)
        }
    }) 
   
   
      
}

function employeeList(){
    return new Promise(function(resolve, reject){
        const list = [];
        connect.query("SELECT * FROM employee", function(err, res){
            if(err) throw err; 
            res.forEach((employee) => {
                list.push({
                    first_name: employee.first_name,
                    last_name: employee.last_name,
                });
            });
            resolve(list);
            //console.log(list); 
        });
    }); 
}




















