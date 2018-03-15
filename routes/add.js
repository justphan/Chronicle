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

	//account verification
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArr = data.accounts[x].events;
			categories = data.accounts[x].categories;
		}
	}

	var newColor;
	var newColorName;
	for (var x = 0; x < categories.length; x++) {
		if(query.category == categories[x]['name']) {
			newColor = categories[x]['color'];
			newColorName = categories[x]['colorname'];
		}
	}

	var newCategory = {
		"name": query.category,
		"color": newColor,
		"colorname": newColorName
	};


	//variable from the form
/*	var dateStart = new Date(query.timestart);
	var dateEnd = new Date(query.timeend); */

	var date = new Date(query.date);
	console.log("Date is: "+date);
	/*
	if(mm<10)
		mm='0'+mm;
	if(dd<10)
		dd='0'+dd;
	*/
	//convert to number
	
	var timeStart = query.timestart;

	var timeEnd = query.timeend;

	

	
	var totalTime = Math.abs((parseInt(timeEnd.substring(0,2))-parseInt(timeStart.substring(0,2))))+(((parseInt(timeEnd.substring(3,5))-parseInt(timeStart.substring(3,5)))/60));//Math.abs(timeStart - timeEnd);
	//totalTime = totalTime / (60*1000);
	console.log("totalTime is " + totalTime);

	timeStart = calcTime(timeStart);
	timeEnd = calcTime(timeEnd);
	

	//creating new event
	var toAddEvent = {
		"category": newCategory,
		"name": newName,
		"totaltime": totalTime,
		"timestart" : timeStart,
		"timeend" : timeEnd,
		"month" : date.getMonth()+1,
		"day" : date.getDate(),
		"year" : date.getFullYear(),
		"date" : query.date
	};

	console.log("month: "+toAddEvent["month"]);
	console.log("day: "+toAddEvent["day"]);
	console.log("year: "+toAddEvent["year"]);

	

	
	
	
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

	//get the corresponding events for the account
	/*
	var account;
	var eventsArr;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			eventsArr = data.accounts[x].events;
		}
	}
	*/

	//prevent page refresh error
	var added = false;
	for(var x = 0; x < eventsArr.length; x++) {
		if(eventsArr[x].timestart == toAddEvent.timestart 
			&& eventsArr[x].timeend==toAddEvent.timeend
			&& eventsArr[x].month == toAddEvent.month
			&& eventsArr[x].day==toAddEvent.day
			&& eventsArr[x].year == toAddEvent.year) { added = true; }
	}


	var events = [];
	var date2 = new Date();
	var month = date2.getMonth()+1;
	if(month < 10)
		month = '0'+month;
	var day = date2.getDate();
	if(day < 10)
		day = '0'+day;
	var year = date2.getFullYear();
	date2 = year+'-'+month+'-'+day;
	console.log("date2: "+date2);
	events.push(date2);
	if(!added) {
		account.events.push(toAddEvent);
	}
	

	for(var x=0; x<account.events.length; x++){
		if(account.events[x]['date']==date2){//account.events[x]['month'] == month && account.events[x]['day'] == day && account.events[x]['year'] == year) {
			events.push(account.events[x]);
		}
	}
	//console.log(data.accounts[0].events);
	res.render('calendar2', {encodedJson : encodeURIComponent(JSON.stringify(events))});
}

exports.addCategory = function(req, res) {

	console.log("adding category");
	//var post_body = req.bdy;
	var query = req.query;
	var newcolor = query.color;

	
	if(newcolor == "red")
		newcolor = "linear-gradient(#EA384D, #b31217)";
	else if (newcolor == "orange")
		newcolor = "linear-gradient(45deg, rgb(252, 137, 26), rgb(222, 102, 0))";
	else if (newcolor == "yellow")
		newcolor = "linear-gradient(#fffd28, #dad831)";
	else if (newcolor == "green")
		newcolor = "linear-gradient(rgb(22, 210, 22), rgb(18, 146, 18))";
	else if (newcolor == "blue")
		newcolor = "linear-gradient(rgb(29, 200, 232), rgb(17, 157, 183))";
	else if (newcolor == "purple")
		newcolor = "linear-gradient(rgb(200, 55, 255), rgb(157, 58, 195))";
	else
		newcolor = "linear-gradient(rgb(189, 195, 199), rgb(127, 132, 136))";


	var category = {
		"name": query.name,
		"color": newcolor,
		"colorname": query.color 
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
		newcolor = "linear-gradient(#EA384D, #b31217)";
	else if (newcolor == "orange")
		newcolor = "linear-gradient(45deg, rgb(252, 137, 26), rgb(222, 102, 0))";
	else if (newcolor == "yellow")
		newcolor = "linear-gradient(#fffd28, #dad831)";
	else if (newcolor == "green")
		newcolor = "linear-gradient(rgb(22, 210, 22), rgb(18, 146, 18))";
	else if (newcolor == "blue")
		newcolor = "linear-gradient(rgb(29, 200, 232), rgb(17, 157, 183))";
	else if (newcolor == "purple")
		newcolor = "linear-gradient(rgb(200, 55, 255), rgb(157, 58, 195))";
	else
		newcolor = "linear-gradient(rgb(189, 195, 199), rgb(127, 132, 136))";

	for (var x = 0; x < account.categories.length; x++) {
		if(category == account.categories[x]['name']) {
			account.categories[x]['color'] = newcolor;
			account.categories[x]['colorname'] = req.query.color;
		}
	}
	res.render('settings', account);
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
	var militaryHour = "";
	var x = 0;
	console.log("Time is "+time);

	while(time.charAt(x)!=":"){
		militaryHour += time.charAt(x);
		x++;
	}
	console.log("militaryHour= "+militaryHour);

	x++;

	var hour="";



	var min = time.substring(x, x+2);
	if(militaryHour < 10)
		hour = '0'+militaryHour;
	//if(min < 10 && min > 0)
	//	min = '0'+min;
	if(militaryHour > 0 && militaryHour < 12) {
		returnTime = militaryHour + ':' + min + "am";
	}
	else if (militaryHour == 0) {
		returnTime = "12:" + min + "am";
	}
	else if (militaryHour == 12) {
		returnTime = militaryHour + ':' + min + "pm";
	}
	else {
		returnTime = (militaryHour-12).toString() + ':' + min + "pm";
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
