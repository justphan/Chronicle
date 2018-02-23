var data = require("../accounts.json");

exports.view = function(req,res){
	console.log(data);
	var events = [];
	var date = new Date();
	events.push(date);
	var month = date.getMonth();
	var day = date.getDate();
	var year = date.getFullYear();

	var eventsArr = data.accounts[0].events;
	for(var x=1; x<eventsArr.length; x++){
		if(eventsArr[x]['month'] == month && eventsArr[x]['day'] == day && eventsArr[x]['year'] == year) {
			events.push(eventsArr[x]);
		}
	}
	//res.render('calendar', data);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}

exports.date = function(req,res){
	var events = [];
	var date = new Date(req.query.viewdate);
	events.push(date);
	var month = date.getMonth();
	var day = date.getDate()+1;
	var year = date.getFullYear();

	var eventsArr = data.accounts[0].events;
	for(var x=1; x<eventsArr.length; x++){
		if(eventsArr[x]['month'] == month && eventsArr[x]['day'] == day && eventsArr[x]['year'] == year) {
			events.push(eventsArr[x]);
		}
	}
	//res.render('calendar', data);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}
