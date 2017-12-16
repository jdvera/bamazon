DROP DATABASE IF EXISTS homework_db;

CREATE DATABASE homework_db;

USE homework_db;

CREATE TABLE inventory (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (id)
);


INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Bread", "Grocery", 2.99, 11);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Paper Goods", 3.49, 20);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Lip Gloss", "Cosmetics", 4.99, 7);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Envelopes", "Stationary", 2.79, 4);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Body Wash", "Bath", 4.99, 15);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Bath", 3.99, 10);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Eye Liner", "Cosmetics", 7.99, 18);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Pencils", "Stationary", 0.49, 21);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Chips", "Grocery", 2.49, 19);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Paper Plates", "Paper Goods", 3.99, 12);

SELECT * FROM inventory;

CREATE TABLE departments (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Paper Goods", 5.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Bath", 10.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cosmetics", 15.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Stationary", 5.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Grocery", 10.00);

SELECT * FROM departments;
