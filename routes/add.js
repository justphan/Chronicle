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

	var newArray = calcID(query.timestart, query.timeend, query.ampm);
	console.log("newArray[0] = "+ newArray[0]);
	console.log("newArray[1] = "+ newArray[1]);

	var toAddEvent = {
		"category": query.category,
		"name": newName,
		"timestart": newArray[0],
		"timeend": newArray[1],
		"date": query.date
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
