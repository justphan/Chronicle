var data = require("../accounts.json");


exports.addEvent = function(req, res) {
	var newName;
	//var query = req.body;
	var query = req.query;
	 if (query.name == "") {
			newName = query.category;
		}
		else {
			newName = query.name;
		}

	var toAddEvent = {
		"category": query.category,
		"name": newName,
		"timestart": query.timestart,
		"timeend": query.timeend,
		"date": query.date
	};
	/*for(var i = 0; i < data.accounts.length; i++) {
		if data.accounts[i].events == undefined {
			data.accounts[i].events = [toAddEvent];
		}
		else {
			data.accounts[i].events.push(toAddEvent);
		}
	}*/
	data.accounts[0].events.push(toAddEvent);

	console.log(data.accounts[0].events);
	res.render('calendar');
}

exports.addCategory = function(req, res) {
	//var post_body = req.bdy;
	var query = req.query;
	var category = {
		"name": query.name
	};
	for(account in data.accounts) {
		account.categories.push(category);
	}
	data.categories.push(category);
	res.render('settings');
}