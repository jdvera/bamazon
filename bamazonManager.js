var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "homework_db"
});

var message = "";


connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	afterConnection();
});




function afterConnection() {
	inquirer.prompt([
	{
		name: "command",
		type: "list",
		message: "What would you like to do?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "END"]
	}
	]).then(function(userCommand) {
		switch (userCommand.command) {
			case "View Products for Sale":
				viewProducts();
				break;
			case "View Low Inventory":
				viewLow();
				break;
			case "Add to Inventory":
				addStock();
				break;
			case "Add New Product":
				newProduct();
				break;
			case "END":
				console.log("\nGoodbye\n")
				connection.end();
				break;
		}
	});
};




function viewProducts() {
	connection.query('SELECT * FROM inventory', function(err, res) {
		if(err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("\n" + res[i].id + ") Product: " + res[i].product_name + "\n   Department: " + res[i].department_name + "\n   Price: $" + res[i].price + "   Quantity: " + res[i].stock_quantity + "\n   Current Sales: $" + res[i].product_sales.toFixed(2));
		}
		console.log("\n");
		afterConnection();
	});
};




function viewLow() {
	connection.query('SELECT * FROM inventory WHERE stock_quantity < 5', function(err, res) {
		if(err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("\n" + res[i].id + ") Product: " + res[i].product_name + "\n   Quantity: " + res[i].stock_quantity);
		}
		console.log("\n");
		afterConnection();
	});
};




function addStock() {
	connection.query('SELECT * FROM inventory', function(err, res) {
		if(err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log("\n" + res[i].id + ") Product: " + res[i].product_name + "\n   Quantity: " + res[i].stock_quantity);
		}
		if (message.length > 0) {
			console.log("\n" + message);
		}
		else {
			console.log("\n");
		}
		inquirer.prompt([
		{
			message: "What Product ID would you like to add stock to? ",
			name: "productID"
		}	
		]).then(function(inquirerResponse) {
			if (!res[inquirerResponse.productID - 1]) {
				message = "\nThere is not a product with that ID.  Please choose a new one.\n";
				addStock();
			}
			else {
				addStockPart2(res, inquirerResponse);
			};
		});
	});
};

function addStockPart2(res, inquirerResponse) {
	inquirer.prompt([
	{
		message: "How much would you like to add? ",
		name: "numAdded"
	}
	]).then(function(inquirerResponse1) {
		if (inquirerResponse1.numAdded < 1 || inquirerResponse1.numAdded != parseInt(inquirerResponse1.numAdded)) {
			console.log("\nPlease input an integer greater than 0\n");
			addStockPart2(res, inquirerResponse);
		}
		else {
			connection.query('UPDATE inventory SET ? WHERE ?',
			[{
				stock_quantity: parseInt(res[inquirerResponse.productID - 1].stock_quantity) + parseInt(inquirerResponse1.numAdded),
			},
			{
				id: inquirerResponse.productID
			}],
			function(err, res1) {
				if (err) throw err;
				message = "";
				console.log("\n\nAdded " + parseInt(inquirerResponse1.numAdded) + " to " + res[inquirerResponse.productID - 1].product_name + "'s stock.\n")
				afterConnection();
			});
		};
	});
};




function newProduct() {
	connection.query('SELECT department_name FROM departments GROUP BY department_name',
	function(err, res) {
		var arr = [];
		for (var i = 0; i < res.length; i++) {
			arr.push(res[i].department_name);
		}
		inquirer.prompt([
		{
			name: "productName",
			message: "What is the product's name?"
		},
		{
			name: "productDepatment",
			type: "list",
			message: "What department is this product in?",
			choices: arr
		}
		]).then(function(inquirerResponse) {
			newProductPart2(res, inquirerResponse);
		});
	});
};

function newProductPart2(res, inquirerResponse) {
	inquirer.prompt([
	{
		name: "productPrice",
		message: "How much does it cost?"
	}
	]).then(function(inquirerResponse1) {
		if (inquirerResponse1.productPrice != parseFloat(inquirerResponse1.productPrice).toFixed(2) || inquirerResponse1.productPrice <= 0) {
			console.log("\nPlease enter a positive amount with only 2 digits\n");
			newProductPart2(res, inquirerResponse);
		}
		else {
			newProductPart3(res, inquirerResponse, inquirerResponse1);
		};
	});
};

function newProductPart3(res, inquirerResponse, inquirerResponse1) {
	inquirer.prompt([
	{
		name: "productStock",
		message: "How much is currently in stock?"
	}
	]).then(function(inquirerResponse2) {
		if (inquirerResponse2.productStock != parseInt(inquirerResponse2.productStock) || inquirerResponse2.productStock < 0) {
			console.log("\nPlease input an integer greater than or equal to 0\n");
			newProductPart3(res, inquirerResponse, inquirerResponse1);
		}
		else {
			var myQuery = 'INSERT INTO inventory (product_name, department_name, price, stock_quantity) VALUES ("' + inquirerResponse.productName + '", "' + inquirerResponse.productDepatment + '", ' + parseFloat(inquirerResponse1.productPrice) + ', ' + parseInt(inquirerResponse2.productStock) + ')';
			connection.query(myQuery, function(err, res1) {
				console.log("\n" + inquirerResponse.productName + " Added!\n");
				afterConnection();
			});
		};
	});
};