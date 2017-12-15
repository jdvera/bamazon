var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("table");

var data = [
	["Department ID", "Department Name", "Overhead Cost", "Product Sales", "Total Profit"]
];
var output;


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
	inquirer.prompt([
	{
		name: "command",
		type: "list",
		message: "What would you like to do?",
		choices: ["View Product Sales by Department", "Create New Department", "END"]
	}
	]).then(function(userCommand) {
		switch (userCommand.command) {
			case "View Product Sales by Department":
				viewSalesByDept();
				break;
			case "Create New Department":
				newDept();
				break;
			case "END":
				console.log("\nGoodbye\n");
				connection.end();
				break;
		}
	});
};



function viewSalesByDept() {
	console.log("\n");
	connection.query('SELECT * FROM departments',
	function(err, res) {
		data = [
			["Department ID", "Department Name", "Overhead Cost", "Product Sales", "Total Profit"]
		];
		sumDeptSales(0, res);
	});
};

function sumDeptSales(n, mySQLArray) {
	if (n < mySQLArray.length) {
		connection.query('SELECT * FROM inventory WHERE ?',
		{
			department_name: mySQLArray[n].department_name
		},
		function(err1, res1) {
			var total = 0;
			var tableRow = [];
			for (var k = 0; k < res1.length; k++) {
				total += res1[k].product_sales;
			}
			tableRow = [mySQLArray[n].id, mySQLArray[n].department_name, mySQLArray[n].over_head_costs.toFixed(2), total.toFixed(2), (total - mySQLArray[n].over_head_costs).toFixed(2)]
			data.push(tableRow);
			n++;
			sumDeptSales(n, mySQLArray);
		});
	}
	else {
	output = table.table(data);
	console.log(output);
	afterConnection();
	};
};



function newDept() {
	connection.query('SELECT department_name FROM departments GROUP BY department_name',
	function(err, res) {
		var arr = [];

		for (var i = 0; i < res.length; i++) {
			arr.push(res[i].department_name);
		};

		inquirer.prompt([
		{
			name: "departmentName",
			message: "What is the department's name?"
		}
		]).then(function(inquirerResponse) {
			if (arr.indexOf(inquirerResponse.departmentName) != -1) {
				console.log("\nThat department already exists.\n");
				afterConnection();
			}
			else {
				newDeptPart2(res, inquirerResponse);
			};
		});
	});
};

function newDeptPart2(res, inquirerResponse) {
	inquirer.prompt([
	{
		name: "overheadCost",
		message: "How much is the Overhead Cost?"
	}
	]).then(function(inquirerResponse1) {
		if (inquirerResponse1.overheadCost != parseFloat(inquirerResponse1.overheadCost).toFixed(2)) {
			console.log("\nPlease enter a price with only 2 digits\n");
			newDeptPart2(res, inquirerResponse);
		}
		else {
			var myQuery = 'INSERT INTO departments (department_name, over_head_costs) VALUES ("' + inquirerResponse.departmentName + '", ' + parseFloat(inquirerResponse1.overheadCost) + ');';
			connection.query(myQuery, function(err, res1) {
				if (err) throw err;
				console.log("\n" + inquirerResponse.departmentName + " Added!\n");
				afterConnection();
			});
		};
	});
};