var data = require("../accounts.json");

exports.view = function(req,res){
	console.log(data);
	req.query.category;
	req.query.name;
	req.query.timestart;
	req.query.timeend;

	var account;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
		}
	}
	res.render('edit', account);
}