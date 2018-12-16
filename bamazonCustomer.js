var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
    console.log("---------------------------------    MENU    ------------------------------------" + "\n");
    showInventory();
});


function showInventory() {

    // console.log("Welcome to BAMAZON BAM BAM!");

    //Setting up our table to display products
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
        buyProducts();

    });
};

function buyProducts() {

    inquirer.prompt([{

        type: "input",
        message: "Please enter the ID number of the item you would like to purchase:",
        name: "inputId",
        validate: function (input) {
            if (parseInt(input) <= allProducts) {
                return true
            } else {
                console.log("\n ***Please enter a valid id.***");
                return false;
            }
        }
    }, {

        type: "input",
        name: "inputNumber",
        message: "How many units would you like to purchase?",
        validate: function (input) {
            if (!isNaN(input) && parseInt(input) > 0) {
                return true;
            } else {
                console.log("\n ***Please enter valid quantity.***");
                return false;
            }
        }
    }]).then(function (answer) {

        var query = "SELECT * FROM PRODUCTS WHERE item_id=?";
        connection.query(query, [answer.inputId], function (err, res) {

            // console.log(res);
            for (var i = 0; i < res.length; i++) {

                if (answer.inputNumber > res[i].stock_quantity) {
                    console.log("=================================================================================\n");
                    console.log("======    Sorry! We don't have enough in stock. Please try again later.    ======");
                    console.log("=================================================================================\n");
                    showInventory();
                } else {
                    console.log("=================================================================================\n\n");
                    console.log("====    Sushi coming up! You've selected : ");
                    console.log("====    " + answer.inputNumber + " order(s) of " + res[i].product_name);
                    console.log("====    Your Total is $" + res[i].price * answer.inputNumber);
                    console.log("====    Thank you for your purchase. I hope you like your sushi!    \n\n");
                    console.log("=================================================================================\n\n");

                    var newStock = (parseInt(res[i].stock_quantity) - parseInt(answer.inputNumber));
                    var purchaseId = parseInt(answer.inputId);
                    updateInventory(newStock, purchaseId);
                    // console.log("Current inventory: " + newStock);
                    // console.log("Purchased Item ID: " + purchaseId);
                };
            };
        });
    });
};

function updateInventory(newStock, purchaseId) {

    var query = "UPDATE products SET ? WHERE ?";
    connection.query(query, [{
        stock_quantity: newStock
    }, {
        item_id: purchaseId
    }], function (err, res) {});

    finalPrompt();

};

function finalPrompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "buyMore",
        message: "Would you like to buy another item?"
    }]).then(function (data) {
        if (data.buyMore) {
            showInventory();
        } else {
            console.log("=================================================================================\n\n");
            console.log("======                  Thank you for stopping by!!                        ======");
            console.log("======                          See you soon!                              ======\n\n");
            console.log("=================================================================================\n\n");
        }
    })
};