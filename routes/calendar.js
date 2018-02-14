var data = require("../accounts.json");

exports.view = function(req,res){
	console.log(data);

	res.render('calendar', data);
}