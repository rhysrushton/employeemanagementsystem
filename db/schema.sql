DROP DATABASE IF EXISTS employee_management; 
CREATE DATABASE employee_management; 

USE employee_management; 

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id)
); 

CREATE TABLE roles ( 
    id INT AUTO_INCREMENT, 
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL, 
    PRIMARY KEY (id)
); 

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL,
    manager_id INT NUll, 
    PRIMARY KEY (id)
); 

