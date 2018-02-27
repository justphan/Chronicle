var data = require("../accounts.json");


exports.addEvent = function(req, res) {

	var newName;
	//var query = req.body;


	//default if no name to name it the category
	var query = req.query;
	if (query.name == "") {
		newName = query.category;
	}
	else {
		newName = query.name;
	}
	var account;
	var eventsArr;
	var categories;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArr = data.accounts[x].events;
			categories = data.accounts[x].categories;
		}
	}
	var newColor;
	for (var x = 0; x < categories.length; x++) {
		if(query.category == categories[x]['name']) {
			newColor = categories[x]['color'];
		}
	}

	var newCategory = {
		"name": query.category,
		"color": newColor
	};


	//variable from the form
	var dateStart = new Date(query.timestart);
	var dateEnd = new Date(query.timeend);

	//convert to number
	var timeStart = calcTime(dateStart);
	var timeEnd = calcTime(dateEnd);
	

	
	var totalTime = Math.abs(dateEnd - dateStart);
	totalTime = totalTime / (60*1000);


	//creating new event
	var toAddEvent = {
		"category": newCategory,
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
	var date = new Date();
	var month = date.getMonth()+1;
	var day = date.getDate()-1;
	var year = date.getFullYear();
	var date = year+'-'+month+'-'+day;
	events.push(date);
	if(!added) {
		account.events.push(toAddEvent);
	}
	

	for(var x=0; x<account.events.length; x++){
		if(account.events[x]['month'] == month-1 && account.events[x]['day'] == day+1 && account.events[x]['year'] == year) {
			events.push(account.events[x]);
		}
	}
	//console.log(data.accounts[0].events);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}

exports.addCategory = function(req, res) {

	console.log("adding category");
	//var post_body = req.bdy;
	var query = req.query;
	var newcolor = query.color;

	
	if(newcolor == "red")
		newcolor = "linear-gradient(#f85032, #e73827)";
	else if (newcolor == "orange")
		newcolor = "linear-gradient(#ff7e5f, #feb47b)";
	else if (newcolor == "yellow")
		newcolor = "linear-gradient(#fffc00, #ffffff)";
	else if (newcolor == "green")
		newcolor = "linear-gradient(#dce35b, #45b649)";
	else if (newcolor == "blue")
		newcolor = "linear-gradient(#9cecfb, #65c7f7, #0052d4)";
	else if (newcolor == "purple")
		newcolor = "linear-gradient(#20002c, #cbb4d4)";
	else
		newcolor = "linear-gradient(#bdc3c7, #2c3e50)";


	var category = {
		"name": query.name,
		"color": newcolor
	};

	var categories;
	var account;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			data.accounts[x].categories.push(category);
			account = data.accounts[x];
			categories = data.accounts[x].categories;
		}
	}
	res.render('settings', account);
}

exports.delCategory = function(req, res) {
	var account;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
		}
	}
	var category = req.query.category;
	for (var x = 0; x < account.categories.length; x++) {
		if(category == account.categories[x]['name']) {
			account.categories.splice(x, 1);
			x--;
		}
	}
	for (var x = 0; x < account.events.length; x++) {
		if(account.events[x]['category'] == category) {
			account.events.splice(x, 1);
			x--;
		}
	}
	res.render('settings', account);
}

exports.changeColor = function(req, res) {
	var account;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
		}
	}
	var category = req.query.category;
	var newcolor = req.query.color;
	if(newcolor == "red")
		newcolor = "linear-gradient(#f85032, #e73827)";
	else if (newcolor == "orange")
		newcolor = "linear-gradient(#ff7e5f, #feb47b)";
	else if (newcolor == "yellow")
		newcolor = "linear-gradient(#fffc00, #ffffff)";
	else if (newcolor == "green")
		newcolor = "linear-gradient(#dce35b, #45b649)";
	else if (newcolor == "blue")
		newcolor = "linear-gradient(#9cecfb, #65c7f7, #0052d4)";
	else if (newcolor == "purple")
		newcolor = "linear-gradient(#20002c, #cbb4d4)";
	else
		newcolor = "linear-gradient(#bdc3c7, #2c3e50)";

	for (var x = 0; x < account.categories.length; x++) {
		if(category == account.categories[x]['name']) {
			account.categories[x]['color'] = newcolor;
		}
	}
	res.render('settings', account.categories);
}

function timeToString(starttime, endtime, meridiem){
	

	var startString = starttime[0]+":"+starttime[1]+meridiem[0];
	var endString = endtime[0]+":"+endtime[1]+meridiem[1];

	var stringArray = [startString, endString];
	return stringArray;


}

//formatting time
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
