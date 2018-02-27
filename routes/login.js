var data = require("../accounts.json");


exports.view = function(req,res){
	res.render('login');
}

exports.err = function(req,res){
	res.render('loginerror');
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
				var date = new Date();
				var month = date.getMonth()+1;
				var day = date.getDate()-1;
				var year = date.getFullYear();
				var date = year+'-'+month+'-'+day;
				var events = [];
				var eventsArr = account.events;
				events.push(date);
				for(var x=0; x<eventsArr.length; x++){
					if(eventsArr[x]['month'] == month && eventsArr[x]['day'] == day && eventsArr[x]['year'] == year) {
						events.push(eventsArr[x]);
					}
				}


				req.session.user_id = username;
				res.render('calendar', {encodedJson : encodeURIComponent(JSON.stringify(events))});
				return;
			}
			else {
				res.redirect('loginerror');
				return;
			}
		}
	}
	res.redirect('loginerror');

}

exports.signout = function(req,res){
	delete req.session.user_id;
	res.redirect('login');
}