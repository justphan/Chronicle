var data = require("../accounts.json");


exports.view = function(req,res){
	res.render('login');
}

exports.login = function(req,res){
	console.log(data);
	var username = req.body.name;
	var password = req.body.pass;
	console.log(username);
	console.log(password);
	var account;
	for(var x = 0; x < data.accounts.length; x++) {
		account = data.accounts[x];
		if(username == account.name) {
			console.log('wow');
			if(password == account.pass) {
				res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(account.events))});
				return;
			}
			else {
				res.render('loginerror');
				return;
			}
		}
	}
	res.render('loginerror');

}

exports.signout = function(req,res){
	res.render('login');
}