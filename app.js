//Dependencies
const inquirer = require("inquirer"); 
const mysql = require("mysql"); 
const consoleTable = require("console.table");
const colors = require("colors"); 
const env = require("dotenv").config();
const figlet = require('figlet'); 
colors.enable(); 

let password = process.env.PASSWORD

var connect = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root", 
    password: password,
    database: "employee_management"
})

figlet('Employee Tracker', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

connect.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connect.threadId + "\n");
    console.log(colors.red("Time to track some employees")); 
    launchApp(); 
})

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
            "View an employee",
            "Update an employee role", ],     
    }).then(({ launch}) => {
        switch (launch) {
            case "Add a department":
                console.log("Add a department")
            break; 
            case "Add a role":
                console.log("Add a role")
            break; 
            case "Add an employee":
                console.log("Add an employee")
            break; 
            case "View a department":
                console.log("View a department")
                viewDeaprtment(); 
            break; 
            case "View a role":
                console.log("View a role")
            break; 
            case "View an employee":
                console.log("View an employee")
            break; 
            case "Update an employee role":
                console.log("Update an employee role")
            break; 
        }
    });
}; 


async function viewDeaprtment(){
    console.log("view")
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