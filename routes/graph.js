var data = require("../accounts.json");

exports.view = function(req,res){
	console.log(data);

	//res.render('graph', data);
	res.render('graph', {encodedJson : encodeURIComponent(JSON.stringify(data))});
}