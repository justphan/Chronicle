var data = require("../accounts.json");

/*$("#week").click(function{
	$('#' + json).push();     //how to push data into variable for different options?
});*/

exports.view = function(req,res){
	console.log(data);

	//res.render('graph', data);
	res.render('graph', {encodedJson : encodeURIComponent(JSON.stringify(data))});
}

exports.week = function(req,res){
	var categoriesEvents = [];
	var events = [];
	var eventsArray = data.accounts[0].events;
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
	categoriesEvents.push(data.accounts[0].categories);
	categoriesEvents.push(events);
	res.render('graphweek', {encodedJson : encodeURIComponent(JSON.stringify(categoriesEvents))});
}

exports.month = function(req,res){
	var categoriesEvents = [];
	var events = [];
	var eventsArray = data.accounts[0].events;
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
	categoriesEvents.push(data.accounts[0].categories);
	categoriesEvents.push(events);
	res.render('graphmonth', {encodedJson : encodeURIComponent(JSON.stringify(categoriesEvents))});
}

exports.year = function(req,res){
	var categoriesEvents = [];
	var events = [];
	var eventsArray = data.accounts[0].events;
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
	categoriesEvents.push(data.accounts[0].categories);
	categoriesEvents.push(events);
	res.render('graphyear', {encodedJson : encodeURIComponent(JSON.stringify(categoriesEvents))});
}