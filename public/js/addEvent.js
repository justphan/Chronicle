'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
}




//COMMENTED OUT UNTIL WE FIGURE OUT DATABASE

// exports.addEvent = function(req, res) {
// 	var newEvent = {

// 	}

// 	console.log(newEvent);
// 	data.events.push(newEvent);

// 	res.render("calendar", data)
// }