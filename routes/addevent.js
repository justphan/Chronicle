var data = require("../accounts.json");

exports.view = function(req,res){
	console.log(data);
	req.query.category;
	req.query.name;
	req.query.timestart;
	req.query.date;
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
	var account;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
		}
	}
	res.render('addevent', account);

}