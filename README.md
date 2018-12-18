# BAMAZON-Webe-SUSHI-app

## Brief App description

Welcome to Bamazon! This is an Amazon-like storefront built with MySQL and Node.js that sells fresh japanese food. 

Within the customer portal, you can view the inventory, choose an item you'd like to purchase
along with the quantity, and voila! Transaction complete! However, if we do not have enough 
of the selected item in stock deeming us unable to fulfill your purchase, the transaction 
will not go through.

Within the manager portal, you can view all inventory in the store, view all low
inventory (less than 5 items in stock), choose to up the inventory back to the correct amount
needed, and even add new items to your inventory! 

Happy shopping!

## Watch how Bamazon works:
    Bamazon Customer : https://youtu.be/ICqFhFLAfKg.
    Bamazon Manager : https://youtu.be/3XerkI5qBso.
    Bamazon Supervisor: https://youtu.be/vT5ERASIs3M.

## Technologies Used:
    Node.js
    JavaScript
    MySql
    Inquirer , Table-CLI (Node Module)

## How to use the app
Customer will get a welcome message and the menu. Inquirer then will take the product id and the quantity of the chosen item. After selected, node then will give the user total amount of the purchase and an option buy more products. The quantity of the products then will get updated into mySql database.

### Bamazon-Customer
1. Insert "node bamazonCustomer.js" in the terminal:
<img src="https://i.imgur.com/0JcDyqw.png" alt="How to use the app" width="400px">

2. Prompt then will give ask you to insert product id and amount:
<img src="https://i.imgur.com/ZTs8C4J.png" alt="prompt" width="400px">

3. User will get the total amount and prompt that asks to purchase more products:
<img src="https://i.imgur.com/7cabooG.png" alt="prompt" width="400px">

4. If user choose not to buy more then thank ou message will be prompted:
<img src="https://i.imgur.com/KhhgYVB.png" alt="prompt" width="400px">

### Bamazon-Manager
1. Insert "node bamazonManager.js" in the terminal: 
<img src="https://i.imgur.com/YSIil7d.png" width="400px">

2. View inventory:
<img src="https://i.imgur.com/mJfBgGJ.png" alt="View Inventory" width="400px">


3. View low inventory (less than 5):
<img src="https://i.imgur.com/gDTFrKC.png" alt="View Low Inventory" width="400px">

4. Add inventory to existing product:
<img src="https://i.imgur.com/j8NSzG6.png" alt="Add inventory" width="400px">

5. Add a completely new product to the menu: 
<img src="https://i.imgur.com/tIgud9X.png" alt="New product" width="400px">

6. View the added new product and end node:
<img src="https://i.imgur.com/LIOD3Pz.png" alt="Exit message" width="400px">

### Bamazon-Supervisor
1. Inser "node bamazonSupervisor.js" in the terminal:
<img src="https://i.imgur.com/zzVOyyh.png" alt="How to use the app" width="400px">

2. View total sales by departments and total profit:
<img src="https://i.imgur.com/FHZ9vkV.png" alt="View sales and profit" width="400px">

3. Create new departments:
<img src="https://i.imgur.com/k38Tsch.png" alt="Create new departments" width="400px">

4. View updated departments and end node:
<img src="https://i.imgur.com/gtItl7L.png" alt="View updated table" width="400px">
