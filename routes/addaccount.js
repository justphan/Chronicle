var data = require("../accounts.json");

exports.addAccount = function(req, res){
	var newAccount = {
		"name": req.query.name,//req.body.name,
		"pass": req.query.pass,//req.body.pass,
		"events":[],
		"categories": [
				{ "name": "Work",
				"color": "linear-gradient(#9cecfb, #65c7f7, #0052d4)",
				"colorname": "blue"},
				{ "name": "Sleep",
				"color": "linear-gradient(#dce35b, #45b649)",
				"colorname": "green"},
				{ "name": "Exercise",
				"color": "linear-gradient(#EA384D, #b31217)",
				"colorname": "red"}
				]
	};
	data.accounts.push(newAccount);
	console.log(data);
	req.session.user_id = req.query.name;//req.body.name;
	var date = new Date();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var year = date.getFullYear();
	if(month < 10)
		month = '0'+month;
	if(day < 10)
		day = '0'+day;
	var date = year+'-'+month+'-'+day;
	var events=[];
	events.push(date);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}