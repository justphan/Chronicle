var data = require("../accounts.json");

/*$("#week").click(function{
	$('#' + json).push();     //how to push data into variable for different options?
});*/

exports.view = function(req,res){
	console.log(data);
	var categoriesEvents = [];
	var events = [];
	var account;
	var eventsArray;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArray = data.accounts[x].events;
		}
	}
	var today = new Date();
	var month;
	var date;
	var year;
	var eventDate;
	for(var x = 0; x < eventsArray.length; x++){
		month = eventsArray[x]['month'];
		date = eventsArray[x]['day'];
		year = eventsArray[x]['year'];
		eventDate = new Date(year, month, date);
		if((today - eventDate) < (24*60*60*1000)) {
			events.push(eventsArray[x]);
		}
	}
	categoriesEvents.push(account.categories);
	categoriesEvents.push(events);
	res.render('graph', {encodedJson : encodeURIComponent(JSON.stringify(categoriesEvents))});
}

exports.week = function(req,res){
	var categoriesEvents = [];
	var events = [];
	var account;
	var eventsArray;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArray = data.accounts[x].events;
		}
	}
	var today = new Date();
	var month;
	var date;
	var year;
	var eventDate;
	for(var x = 0; x < eventsArray.length; x++){
		month = eventsArray[x]['month'];
		date = eventsArray[x]['day'];
		year = eventsArray[x]['year'];
		eventDate = new Date(year, month, date);
		if((today - eventDate) < (7*24*60*60*1000)) {
			events.push(eventsArray[x]);
		}
	}
	categoriesEvents.push(account.categories);
	categoriesEvents.push(events);
	res.render('graphweek', {encodedJson : encodeURIComponent(JSON.stringify(categoriesEvents))});
}

exports.month = function(req,res){
	var categoriesEvents = [];
	var events = [];
	var account;
	var eventsArray;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArray = data.accounts[x].events;
		}
	}
	var today = new Date();
	var month;
	var date;
	var year;
	var eventDate;
	for(var x = 0; x < eventsArray.length; x++){
		month = eventsArray[x]['month'];
		date = eventsArray[x]['day'];
		year = eventsArray[x]['year'];
		eventDate = new Date(year, month, date);
		if((today - eventDate) < (30*24*60*60*1000)) {
			events.push(eventsArray[x]);
		}
	}
	categoriesEvents.push(account.categories);
	categoriesEvents.push(events);
	res.render('graphmonth', {encodedJson : encodeURIComponent(JSON.stringify(categoriesEvents))});
}

exports.year = function(req,res){
	var categoriesEvents = [];
	var events = [];
	var account;
	var eventsArray;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArray = data.accounts[x].events;
		}
	}
	var today = new Date();
	var month;
	var date;
	var year;
	var eventDate;
	for(var x = 0; x < eventsArray.length; x++){
		month = eventsArray[x]['month'];
		date = eventsArray[x]['day'];
		year = eventsArray[x]['year'];
		eventDate = new Date(year, month, date);
		if((today - eventDate) < (365*24*60*60*1000)) {
			events.push(eventsArray[x]);
		}
	}
	categoriesEvents.push(account.categories);
	categoriesEvents.push(events);
	res.render('graphyear', {encodedJson : encodeURIComponent(JSON.stringify(categoriesEvents))});
}