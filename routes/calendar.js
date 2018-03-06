var data = require("../accounts.json");

exports.view = function(req,res){
	console.log(data);
	var events = [];
	var date = new Date();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var year = date.getFullYear()
	if(month < 10)
		month = '0'+month;
	if(day < 10)
		day = '0'+day;
	var date = year+'-'+month+'-'+day;
	events.push(date);


	var account;
	var eventsArr;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArr = data.accounts[x].events;
		}
	}
	for(var x=0; x<eventsArr.length; x++){
		if(eventsArr[x]['date']==date){//eventsArr[x]['month'] == month-1 && eventsArr[x]['day'] == day && eventsArr[x]['year'] == year) {
			events.push(eventsArr[x]);
		}
	}

	
	//res.render('calendar', data);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}

exports.date = function(req,res){
	var events = [];
	var date = new Date(req.query.viewdate);
	var month = date.getMonth()+1;
	var day = date.getDate()+1;
	if(month < 10)
		month = '0'+month;
	if(day < 10)
		day = '0'+day;
	var year = date.getFullYear();
	var date = year+'-'+month+'-'+day;
	events.push(date);
	/*
	var month = parseInt(date.substring(5,6));
	var day = parseInt(date.substring(8,9));
	var year = parseInt(date.substring(0,3));*/

	var account;
	var eventsArr;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArr = data.accounts[x].events;
		}
	}
	for(var x=0; x<eventsArr.length; x++){
		if(eventsArr[x]['date']==date){//eventsArr[x]['month'] == month-1 && eventsArr[x]['day'] == day && eventsArr[x]['year'] == year) {
			events.push(eventsArr[x]);
		}
	}
	//res.render('calendar', data);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}

exports.view2 = function(req,res){
	console.log(data);
	var events = [];
	var date = new Date();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var year = date.getFullYear();
	if(month < 10)
		month = '0'+month;
	if(day < 10)
		day = '0'+day;
	var date = year+'-'+month+'-'+day;
	events.push(date);


	var account;
	var eventsArr;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArr = data.accounts[x].events;
		}
	}
	for(var x=0; x<eventsArr.length; x++){
		if(eventsArr[x]['date']==date){//eventsArr[x]['month'] == month-1 && eventsArr[x]['day'] == day && eventsArr[x]['year'] == year) {
			events.push(eventsArr[x]);
		}
	}

	
	//res.render('calendar', data);
	res.render('calendar2', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}