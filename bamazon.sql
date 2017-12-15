CREATE DATABASE homework_db;

USE homework_db;

CREATE TABLE inventory (
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);


INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Bread", "Grocery", 2.99, 11);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Paper Goods", 3.49, 20);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Tylenol", "Pain", 4.99, 7);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Envelope", "Stationary", 2.79, 4);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Fabric Softener", "Laundry", 4.99, 15);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Shower", 3.99, 10);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Eye Liner", "Cosmetics", 7.99, 18);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Pencil", "Stationary", 0.49, 21);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Chips", "Grocery", 2.49, 19);

INSERT INTO inventory (product_name, department_name, price, stock_quantity)
VALUES ("Band-Aid", "Bandages", 3.99, 12);