var data = require("../accounts.json");


exports.addEvent = function(req, res) {
	var newName;
	//var query = req.body;
	var query = req.query;
	 if (query.name == "") {
			newName = query.category;
		}
		else {
			newName = query.name;
		}

	var dateStart = new Date(query.timestart);
	var dateEnd = new Date(query.timeend);

	var timeStart = calcTime(dateStart);
	var timeEnd = calcTime(dateEnd);
	

	var totalTime = Math.abs(dateEnd - dateStart);
	totalTime = totalTime / (60*1000);

	var toAddEvent = {
		"category": query.category,
		"name": newName,
		"totaltime": totalTime,
		"timestart" : timeStart,
		"timeend" : timeEnd,
		"month" : dateStart.getMonth(),
		"day" : dateStart.getDate(),
		"year" : dateStart.getFullYear()
	};

	
	
	
	/*for(var i = 0; i < data.accounts.length; i++) {
		if data.accounts[i].events == undefined {
			data.accounts[i].events = [toAddEvent];
		}
		else {
			data.accounts[i].events.push(toAddEvent);
		}
	}*/
	/*
	for(var i = 0; i < data.accounts.length; i++) {
		if (data.accounts[i].name == username)
			data.accounts[i].events.push(toAddEvent);
	}*/
	var account;
	var eventsArr;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArr = data.accounts[x].events;
		}
	}
	var added = false;
	for(var x = 0; x < eventsArr.length; x++) {
		if(eventsArr[x].timestart == toAddEvent.timestart 
			&& eventsArr[x].timeend==toAddEvent.timeend
			&& eventsArr[x].month == toAddEvent.month
			&& eventsArr[x].day==toAddEvent.day
			&& eventsArr[x].year == toAddEvent.year) { added = true; }
	}
	var events = [];
	if(!added) {
		account.events.push(toAddEvent);
	}
	
	var date = new Date();
	events.push(date)
	var month = date.getMonth();
	var day = date.getDate();
	var year = date.getFullYear();

	for(var x=1; x<eventsArr.length; x++){
		if(eventsArr[x]['month'] == month && eventsArr[x]['day'] == day && eventsArr[x]['year'] == year) {
			events.push(eventsArr[x]);
		}
	}
	//console.log(data.accounts[0].events);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}

exports.addCategory = function(req, res) {

	console.log("adding category");
	//var post_body = req.bdy;
	var query = req.query;

	var category = {
		"name": query.newCategory
	};

	for(account in data.accounts) {
		account.categories.push(category);
	}
	data.categories.push(category);
	res.render('addevent');
}

function timeToString(starttime, endtime, meridiem){
	

	var startString = starttime[0]+":"+starttime[1]+meridiem[0];
	var endString = endtime[0]+":"+endtime[1]+meridiem[1];

	var stringArray = [startString, endString];
	return stringArray;


}

function calcTime(time){
	var returnTime = "";
	var hour = time.getHours();
	var min = time.getMinutes();
	if(hour < 10)
		hour = '0'+hour;
	if(min < 10)
		min = '0'+min;
	if(time.getHours() > 0 && time.getHours() < 12) {
		returnTime = hour + ':' + min + "am";
	}
	else if (time.getHours() == 0) {
		returnTime = "12:" + min + "am";
	}
	else if (time.getHours() == 12) {
		returnTime = hour + ':' + min + "pm";
	}
	else {
		returnTime = (hour-12).toString() + ':' + min + "pm";
	}
	return returnTime;

}
function calcID(starttime, endtime, meridiem){
	console.log("running calcID");
	console.log(starttime[0]+" "+starttime[1]);
	console.log(endtime[0]+" "+endtime[1]);
	console.log(meridiem);

	var startID = 0;
	var endID = 0;

	starttime[0] = parseInt(starttime[0]);
	endtime[0] = parseInt(endtime[0]);

	if (starttime[0] == 12){
		starttime[0] = 0;
	}

	if (endtime[0] == 12){
		endtime[0] = 0;
	}

	if(meridiem[0]=="pm"){
		starttime[0] += 12;
	}

	if(meridiem[1]=="pm"){
		endtime[0] += 12;
	}

	startID += starttime[0]*4;
	startID += starttime[1]/15;

	console.log("end ID before calculations"+endID);
	endID += endtime[0]*4;
	console.log("end ID after 1st calculation"+endID);
	endID += endtime[1]/15;

	console.log("StartID = "+startID);
	console.log("endID = "+endID);

	var newArray = [startID, endID];
	return newArray;


}
