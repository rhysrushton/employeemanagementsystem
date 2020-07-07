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
            "View a role",
            "View employees",
            "Update an employee role", ],     
    }).then(({ launch}) => {
        switch (launch) {
            case "Add a department":
                console.log("Add a department")
                addDepartment(); 
            break; 
            case "Add a role":
                console.log("Add a role")
            break; 
            case "Add an employee":
                console.log("Add an employee")
            break; 
            case "View a department":
                //console.log("View a department")
                viewDeaprtment(); 
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
                console.log("Update an employee role")
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

async function addDepartment(){
    console.log("We are adding a department")
    const newDepartmentChoice = await inquirer.prompt([
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
    
  
}
   























//Figuring out colors. 
//For reference only.
//Delete after app. 

/*
var x = myFunction(4, 3);   // Function is called, return value will end up in x

function myFunction(a, b) {
  return a * b;  
             // Function returns the product of a and b
  
}

myFunction(); 
console.log('x'.green); 
console.log(colors.rainbow('Hey'), x); 
*/ 

/*
//Basic stuff for figuring out tables. 
const table = ["team 1", "team2", "team3", "team4", "team5"];
const table1 = ["team1", "team2", "1000"];
const man = {
    man: "man",
    age: 1001,
    hasAJob: "No"
}

console.table(table, table1, man)
*/ 

/* NEED TO EXPLAIN .env process set up for user */ 