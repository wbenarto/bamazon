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
    console.log("------------------------------    Supervisor Portal    -----------------------------" + "\n");
    showPrompt();
});

function showPrompt() {
    inquirer.prompt([{
        type: "rawlist",
        name: "input",
        message: "What would you like to do:",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function(answer){
        switch(answer.input) {
            case 'View Product Sales by Department':
                viewDeptSales();
                break;
            case 'Create New Department':
                newDept();
                break;
        };
    });
};

function viewDeptSales() {
    var table = new Table({
        head: ['ID','Department', 'Total Sales \nby Dept', 'Overhead Costs', "Total Profit"],
        colWidths: [5, 20, 20, 20, 20]
    });

    var query = `SELECT 
    departments.department_id, 
    departments.department_name, 
    departments.overhead_costs,
    SUM(products.product_sales) as total_sales 
    from departments LEFT JOIN products ON departments.department_name 
    = products.department_name GROUP BY department_id`;
    connection.query(query, function(err, res){
       
        for(var i = 0; i < res.length; i++) {
            
            var deptId = res[i].department_id,
            deptName = res[i].department_name,
            deptSales = res[i].total_sales,
            overhead = res[i].overhead_costs,
            totalProfit = deptSales - overhead;

            table.push(
                [deptId, deptName, "$ " + deptSales, "$ " + overhead, "$ " + totalProfit]
            );
        };
        var output = "\n" + table.toString() + "\n";
        console.log(output);

        finalPrompt();
    })

    
};

function newDept(){
    inquirer.prompt([{
        type: "input",
        name: "dept_name",
        message: "What department would you like to add: "
    }, {
        type: "input",
        name: "overhead_costs",
        message: "Do they have outstanding overhead costs: "
    }]).then(function(answer){
        var query = `INSERT INTO departments SET ?`;
        connection.query(query, [{
            department_name : answer.dept_name, 
            overhead_costs: answer.overhead_costs}], function(err, res){
            console.log("New department has been added: " + answer.dept_name + " with " + answer.overhead_costs + " overhead costs.");
            finalPrompt();
        })
    });
    
};

function finalPrompt() {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to go to back to Supervisor Portal?",
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