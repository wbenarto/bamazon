DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INT(10),
    stock_quantity INT(10),
    PRIMARY KEY (item_id)
)

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES 
    (1, "California Roll", "Inside Out", 9, 4),
    (2, "Avocado Cucumber Roll", "Inside Out", 6, 4),
    (3, "Salmon Avocado Roll", "Inside Out", 8, 10),
    (4, "Spicy Tuna Roll", "Inside Out", 8, 10),
    (5, "Philadelphia Roll", "Inside Out", 8, 4),
    (6, "Angry Albacore Roll", "Inside Out", 9, 5),
    (7, "Tokyo Lights Roll", "Special", 12, 10),
    (8, "Volcano Roll", "Special", 11, 8),
    (9, "Spider Roll", "Special", 12, 5),
    (10, "Salmon Sashimi", "Sashimi", 16, 0),
    (11, "Inari", "Side Dish", 4, 10),
    (12, "Edamame", "Side Dish", 4, 10)

CREATE TABLE departments (
    department_id INT(10) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    overhead_costs INT(10) NOT NULL,
    PRIMARY KEY (department_id)
)

INSERT INTO departments (department_id, department_name, overhead_costs) VALUES
    (1, "Inside Out", 245),
    (2, "Special", 875),
    (3, "Sashimi", 19),
    (4, "Side Dish", 29)
