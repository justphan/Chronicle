var data = require("../data.json");

exports.addEvent = function(req, res) {
	var event = {
		"category": req.query.category,
		"name": if (req.query.name) == "" {
			req.query.category;
		}
		else {
			req.query.name;
		},
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