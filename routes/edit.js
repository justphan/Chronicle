var data = require("../accounts.json");

exports.view = function(req, res){
	req.query.category;
	req.query.name;
	req.query.timestart;
	req.query.timeend;

	var account;
	var obj = {};
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			obj.categories = account.categories;
		}
	}

	var z = req.query;
	var date = new Date(z.date);
	var month = date.getMonth();
	var day = date.getDate();
	var year = date.getFullYear();
	for(var x = 0; x < account.events.length; x++) {
		var eve = account.events[x];
		if(eve.name == z.name && eve.category.name == z.category && eve.timestart == z.timestart && eve.timeend == z.timeend && eve.date == z.date) {
			obj.eve = eve;
		}
	}

	res.render('edit', {encodedJson : encodeURIComponent(JSON.stringify(obj))});
}

exports.editEvent = function(req, res){
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
	for (var x = 0; x < categories.length; x++) {
		if(query.category == categories[x]['name']) {
			newColor = categories[x]['color'];
		}
	}

	var newCategory = {
		"name": query.category,
		"color": newColor
	};

	var timeStart = query.timestart;
	timeStart = calcTime(timeStart);
	var timeEnd = query.timeend;
	timeEnd = calcTime(timeEnd);
	

	
	var totalTime = Math.abs((parseInt(timeEnd.substring(0,2))-parseInt(timeStart.substring(0,2))))+Math.abs(((parseInt(timeEnd.substring(3,5))-parseInt(timeStart.substring(3,5)))/60));//Math.abs(timeStart - timeEnd);
	//totalTime = totalTime / (60*1000);
	console.log("totalTime is " + totalTime);

	var date = new Date(query.date);

	//creating new event
	var editedEvent = {
		"category": newCategory,
		"name": newName,
		"totaltime": totalTime,
		"timestart" : timeStart,
		"timeend" : timeEnd,
		"month" : date.getMonth()+1,
		"day" : date.getDate()+1,
		"year" : date.getFullYear(),
		"date" : query.date
	};


	//prevent page refresh error
	var added = false;
	for(var x = 0; x < eventsArr.length; x++) {
		if(eventsArr[x].timestart == editedEvent.timestart 
			&& eventsArr[x].timeend==editedEvent.timeend
			&& eventsArr[x].month == editedEvent.month
			&& eventsArr[x].day==editedEvent.day
			&& eventsArr[x].year == editedEvent.year) { added = true; }
	}


	var events = [];
	var date2 = new Date();
	var month = date2.getMonth()+1;
	var day = date2.getDate();
	var year = date2.getFullYear();
	date2 = year+'-'+month+'-'+day;
	console.log("date2: "+date2);
	events.push(date2);

	for(var x=0; x<account.events.length; x++){
		var eve = account.events[x];
		if(eve.date==query.date && eve.timeend==calcTime(query.oldend) && eve.timestart==calcTime(query.oldstart) && eve.category.name==query.oldcat && eve.name==query.oldname)
			account.events.splice(x,1);
	}

	if(!added)
		account.events.push(editedEvent);

	for(var x=0; x<account.events.length; x++){
		if(account.events[x]['month'] == month && account.events[x]['day'] == day && account.events[x]['year'] == year) {
			events.push(account.events[x]);
		}
	}

	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
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