'use strict';




// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

})

function initializePage() {
	console.log("Javascript connected!");
//	console.log("data is in javascript file.  here it is"+data);

}

$("#63").css('background-color',"red");

$("#add-button").click(function(event){
	event.preventDefault();
	console.log("button clicked");
	window.location.replace("/addevent");
	
})



// function getEvents(){
// 	var events = data.accounts[0].events;

// 	console.log("calling getEvents function.  The first event is"+events[0]);	
// }

// function calcID(starttime, endtime, meridiem){
// 	console.log("running calcID");
// 	console.log(starttime[0]+" "+starttime[1]);
// 	console.log(endtime[0]+" "+endtime[1]);
// 	console.log(meridiem);

// 	var startID = 0;
// 	var endID = 0;

// 	starttime[0] = parseInt(starttime[0]);
// 	endtime[0] = parseInt(endtime[0]);

// 	if (starttime[0] == 12){
// 		starttime[0] = 0;
// 	}

// 	if (endtime[0] == 12){
// 		endtime[0] = 0;
// 	}

// 	if(meridiem[0]=="pm"){
// 		starttime[0] += 12;
// 	}

// 	if(meridiem[1]=="pm"){
// 		endtime[0] += 12;
// 	}

// 	startID += starttime[0]*4;
// 	startID += starttime[1]/15;

// 	console.log("end ID before calculations"+endID);
// 	endID += endtime[0]*4;
// 	console.log("end ID after 1st calculation"+endID);
// 	endID += endtime[1]/15;

// 	console.log("StartID = "+startID);
// 	console.log("endID = "+endID);


// }

