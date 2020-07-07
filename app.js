//Dependencies
const inquirer = require("inquirer"); 
const mysql = require("mysql"); 
const consoleTable = require("console.table");
const colors = require("colors"); 
const env = require("dotenv").config();
colors.enable(); 

let password = process.env.PASSWORD

var connect = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root", 
    password: password,
    database: "employee_management"
})

connect.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connect.threadId + "\n");
    console.log(colors.rainbow("Welcome!"));
    console.log("   \              / ");
    console.log("    \            /  ______          _____    ___   __  __   ______");
    console.log("     \    /\    /  |        |      /     \  /   \  /  \/  \ |");
     console.log("      \  /  \  /   |---     |     |         |   | |       | |---");
    console.log("       \/    \/    |______  |_____ \_____/  \___/ |       | |_____");

});


























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