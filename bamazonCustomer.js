var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "homework_db"
});


connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	afterConnection();
});



function afterConnection() {
	connection.query('SELECT * FROM inventory', function(err, res) {
		if(err) throw err;
		for (var i = 0; i < res.length; i++) {
			if (res[i].stock_quantity > 0) {
				console.log("\n" + res[i].id + ") Product: " + res[i].product_name + "\n   Price: $" + res[i].price + "   Quantity: " + res[i].stock_quantity);
			};
		};
		console.log("\n");
		sellProduct(res);
	});
};



function sellProduct(products) {
	inquirer.prompt([
	{
		message: "What Product ID would you like to purchase? (enter 'end' to close) ",
		name: "productID"
	}	
	]).then(function(inquirerResponse) {
		if (inquirerResponse.productID.toLowerCase() == "end") {
			console.log("\nGoodbye\n");
			connection.end();
		}
		else if (!products[inquirerResponse.productID - 1]) {
			console.log("\nThere is not a product with that ID.  Please choose a new one.\n");
			sellProduct(products);
		}
		else if (products[inquirerResponse.productID - 1].stock_quantity < 1) {
			console.log("\nWe are currently out of that product.  Please choose a new one.\n");
			sellProduct(products);
		}
		else {
			sellProductPart2(products, inquirerResponse);
		};
	});
};

function sellProductPart2(products, inquirerResponse) {
	inquirer.prompt([
	{
		message: "How much would you like to buy? ",
		name: "numSold"
	}
	]).then(function(inquirerResponse1) {
		if (inquirerResponse1.numSold < 1 || inquirerResponse1.numSold != parseInt(inquirerResponse1.numSold)) {
			console.log("\nPlease input an integer greater than 0\n");
			sellProductPart2(products, inquirerResponse);
		}
		else if (products[inquirerResponse.productID - 1].stock_quantity < inquirerResponse1.numSold) {
			console.log("\nInsuffitient Quantity!\n");
			sellProductPart2(products, inquirerResponse);
		}
		else {
			connection.query('UPDATE inventory SET ? WHERE ?',
			[{
				stock_quantity: products[inquirerResponse.productID - 1].stock_quantity - inquirerResponse1.numSold,
				product_sales: products[inquirerResponse.productID - 1].product_sales + (products[inquirerResponse.productID - 1].price * inquirerResponse1.numSold)
			},
			{
				id: inquirerResponse.productID
			}],
			function(err, res) {
				if (err) throw err;
				afterConnection();
			});
		};
	});
};