var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Webe072761",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  showProducts();
});

function showProducts() {
    console.log("We are connected!");
    var query = ("SELECT * FROM products");
    connection.query(query, function(err,res){
        for (var i = 0; i < res.length; i++){
            console.log("Product name: " + res[i].product_name + "\nSelection: " + res[i].department_name + "\nPrice: $" 
            + res[i].price + "\nQuantity in stock: " + res[i].stock_quantity +
            "\n-----------------------------\n");
        }
        
    });

    buyProducts();
};

// function buyProducts() {
//     inquirer.prompt({
//         name: "id",

//     })
// }