var data = require("../accounts.json");

exports.addAccount = function(req, res){
	var newAccount = {
		"name": req.body.name,
		"pass": req.body.pass,
		"events":[],
		"categories": [
				{ "name": "Work",
				"color": "linear-gradient(#9cecfb, #65c7f7, #0052d4)"},
				{ "name": "Sleep",
				"color": "linear-gradient(#dce35b, #45b649)"},
				{ "name": "Exercise",
				"color": "linear-gradient(#dce35b, #45b649)"}
				]
	};
	data.accounts.push(newAccount);
	console.log(data);
	req.session.user_id = req.body.name;
	var date = new Date();
	var month = date.getMonth()+1;
	var day = date.getDate()-1;
	var year = date.getFullYear();
	var date = year+'-'+month+'-'+day;
	var events=[];
	events.push(date);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}