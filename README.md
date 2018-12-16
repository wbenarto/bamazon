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
https://youtu.be/ICqFhFLAfKg

## Technologies Used:
    Node.js
    JavaScript
    MySql
    Inquirer , Table-CLI (Node Module)

## How to use the app
Customer will get a welcome message and the menu. Inquirer then will take the product id and the quantity of the chosen item. After selected, node then will give the user total amount of the purchase and an option buy more products. The quantity of the products then will get updated into mySql database.

1. Insert "node bamazonCustomer.js" in the terminal:
![How to use the app](https://imgur.com/mYliPxO)

2. Prompt then will give ask you to insert product id and amount:
![prompt](https://imgur.com/ZTs8C4J)

3. User will get the total amount and prompt that asks to purchase more products:
![prompt](https://imgur.com/7cabooG)

4. If user choose not to buy more then thank ou message will be prompted:
![prompt](https://imgur.com/KhhgYVB)