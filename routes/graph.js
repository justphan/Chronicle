var data = require("../accounts.json");

/*$("#week").click(function{
	$('#' + json).push();
});*/

exports.view = function(req,res){
	console.log(data);

	//res.render('graph', data);
	res.render('graph', {encodedJson : encodeURIComponent(JSON.stringify(data))});
}