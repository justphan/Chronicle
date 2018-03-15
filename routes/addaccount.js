var data = require("../accounts.json");

exports.addAccount = function(req, res){
	var newAccount = {
		"name": req.query.name,//req.body.name,
		"pass": req.query.pass,//req.body.pass,
		"events":[],
		"categories": [
				{ "name": "Work",
				"color": "linear-gradient(rgb(29, 200, 232), rgb(17, 157, 183))",
				"colorname": "blue"},
				{ "name": "Leisure",
				"color": "linear-gradient(rgb(22, 210, 22), rgb(18, 146, 18))",
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
	res.render('calendar2', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}