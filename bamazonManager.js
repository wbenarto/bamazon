var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//=================================Connect to SQL database===============================
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n\n\n\n")
    console.log("-------------------    Welcome to Webe Sushi San Francisco    -------------------");
    console.log("-------   We provide healthy Japanese food using sustainable ingredients   ------" + "\n");
    console.log("------------------------------    Manager Portal    -----------------------------" + "\n");
    showPrompt();
});

function showPrompt() {
    //Menu option 
    inquirer.prompt([{

        type: "rawlist",
        message: "What would you like to do:",
        name: "input",
        choices: ["View Inventory", "View Low Inventory", "Add To Inventory", "Add New Product"]

    }]).then(function (answer) {
        switch (answer.input) {
            case 'View Inventory':
                viewProducts();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add To Inventory':
                showInventory();
                break;
            case 'Add New Product':
                newProduct();
                break;
        }
    });
};

function viewProducts() {
    //list all products in inventory

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [5, 30, 20, 10, 10]
    });

    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        console.log(res[i].product_sales)
        for (var i = 0; i < res.length; i++) {

            var itemID = res[i].item_id,
                productName = res[i].product_name,
                departmentName = res[i].department_name,
                price = res[i].price,
                stockQuantity = res[i].stock_quantity;

            table.push(
                [itemID, productName, departmentName, "$ " + price, stockQuantity]
            );
        };

        var output = "\n" + table.toString() + "\n";

        console.log(output);

        allProducts = res.length;

        finalPrompt();
    });

};

function lowInventory() {
    //inventory for products less than 5
    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [5, 30, 20, 10, 10]
    });

    var query = "SELECT * FROM products WHERE stock_quantity BETWEEN 0 and 4";
    connection.query(query, function (err, res) {

        for (var i = 0; i < res.length; i++) {

            var itemID = res[i].item_id,
                productName = res[i].product_name,
                departmentName = res[i].department_name,
                price = res[i].price,
                stockQuantity = res[i].stock_quantity;

            table.push(
                [itemID, productName, departmentName, "$ " + price, stockQuantity]
            );
        };

        var output = "\n" + table.toString() + "\n";

        console.log(output);
        finalPrompt();
    });

};

function showInventory() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [5, 30, 20, 10, 10]
    });

    var query = ("SELECT * FROM products");
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {

            var itemID = res[i].item_id,
                productName = res[i].product_name,
                departmentName = res[i].department_name,
                price = res[i].price,
                stockQuantity = res[i].stock_quantity;

            table.push(
                [itemID, productName, departmentName, "$ " + price, stockQuantity]
            );
        };

        var output = "\n" + table.toString() + "\n";

        console.log(output);

        allProducts = res.length;
        addInventory();

    });
};

function addInventory() {
    //add more of the item in inventory
    inquirer.prompt([{
        type: "input",
        name: "itemId",
        message: "Please enter item ID to add more products:",
        validate: function (input) {
            if (parseInt(input) <= allProducts) {
                return true
            } else {
                console.log("\n ***Please enter a valid id.***");
                return false;
            };
        }
    }, {
        type: "input",
        name: "addMore",
        message: "How many would you like to add:",
        validate: function (input) {
            if (!isNaN(input) && parseInt(input) > 0) {
                return true;
            } else {
                console.log("\n ***Please enter valid quantity.***");
                return false;
            };
        }
    }]).then(function (answer) {

        var query = "SELECT * FROM products WHERE item_id=?";
        connection.query(query, [answer.itemId], function (err, res) {
            if (err) throw err;

            var itemName = res[0].product_name;
            var itemStock = res[0].stock_quantity;
            var updateInventory = itemStock + parseInt(answer.addMore);

            var query = "UPDATE products SET ? WHERE ?";
            connection.query(query, [{
                stock_quantity: updateInventory
            }, {
                item_id: answer.itemId
            }]);

            console.log("\n\n" + itemName + " is now " + updateInventory + "\n\n");
            finalPrompt();
            // console.log(stock_quantity)
        });
    });
};

function newProduct() {
    //add completely new product

    inquirer.prompt([{
        type: "input",
        name: "prodName",
        message: "What new product would you like to add: "
    }, {
        type: "input",
        name: "deptName",
        message: "Which department will this be added into: "
    }, {
        type: "input",
        name: "price",
        message: "How much is the retail price of the new product: $ "
    }, {
        type: "input",
        name: "stock_quantity",
        message: "What is the quantity of the new product: "
    }]).then(function (answer) {
        var query = "INSERT INTO products SET ?";
        connection.query(query, [{
            product_name: answer.prodName,
            department_name : answer.deptName,
            price : answer.price,
            stock_quantity: parseInt(answer.stock_quantity)
        }]);

        console.log(answer.prodName + " " + answer.stock_quantity);

        finalPrompt();
    })



};

function finalPrompt() {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to go to back to Manager Portal?",
        name: "portal",
        default: true
    }]).then(function (answer) {
        if (answer.portal) {
            showPrompt();
        } else {
            console.log("=================================================================================\n\n");
            console.log("======                  Thank you for stopping by!!                        ======");
            console.log("======                          See you soon!                              ======\n\n");
            console.log("=================================================================================\n\n");
        }
    })
};
