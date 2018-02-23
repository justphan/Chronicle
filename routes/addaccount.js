var data = require("../accounts.json");

exports.addAccount = function(req, res){
	var newAccount = {
		"name": req.body.name,
		"pass": req.body.pass,
		"events":[],
		"categories": [
				{ "name": "Work" },
				{ "name": "Sleep" },
				{ "name": "Exercise" }
				]
	}
	data.accounts.push(newAccount);
	console.log(data);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(newAccount.events))});
}