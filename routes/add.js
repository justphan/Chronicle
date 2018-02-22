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
	

	data.accounts[0].events.push(toAddEvent);

	console.log(data.accounts[0].events);
	res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(data))});
}

exports.addCategory = function(req, res) {
	//var post_body = req.bdy;
	var query = req.query;
	var category = {
		"name": query.name
	};
	for(account in data.accounts) {
		account.categories.push(category);
	}
	data.categories.push(category);
	res.render('settings');
}

function timeToString(starttime, endtime, meridiem){
	

	var startString = starttime[0]+":"+starttime[1]+meridiem[0];
	var endString = endtime[0]+":"+endtime[1]+meridiem[1];

	var stringArray = [startString, endString];
	return stringArray;


}

function calcTime(time){
	var returnTime = "";
	if(time.getHours() > 0 && time.getHours() < 12) {
		returnTime = time.getHours + ':' + time.getMinutes() + "am";
	}
	else if (time.getHours() == 0) {
		returnTime = "12:" + time.getMinutes() + "am";
	}
	else if (time.getHours() == 12) {
		returnTime = time.getHours + ':' + time.getMinutes() + "pm";
	}
	else {
		returnTime = (time.getHours()-12).toString() + ':' + time.getMinutes() + "pm";
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
