var data = require("../accounts.json");

exports.view = function(req,res){
	console.log(data);
	req.query.category;
	req.query.name;
	req.query.timestart;
	req.query.ampm
	req.query.timeend;
	/*var newEvent = {
		"category": req.query.category,
		"name": req.query.name,
		"timestart": req.query.timestart,
		"timeend": req.query.timeend,
		"date": 
	};
	console.log(newEvent);
	data.accounts.events.push(newEvent);*/
	res.render('addevent', data);

}