var data = require("../accounts.json");

exports.view = function(req,res){
	console.log(data);
	var account;
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
		}
	}
	res.render('settings', account);
}