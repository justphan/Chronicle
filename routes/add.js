var data = require("../accounts.json");

exports.addEvent = function(req, res) {
	var newName;
	 if (req.query.name == "") {
			newName = req.query.category;
		}
		else {
			newName = req.query.name;
		}

	var event = {
		"category": req.query.category,
		"name": newName,
		"timestart": req.query.timestart,
		"timeend": req.query.timeend,
		"date": req.query.date
	};
	data.events.push(event);
	res.render('index', data);
}

exports.addCategory = function(req, res) {
	var category = {
		"name": req.query.name
	};
	data.categories.push(category);
	res.render('settings');
}