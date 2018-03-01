var data = require("../accounts.json");

exports.view = function(req, res){
	req.query.category;
	req.query.name;
	req.query.timestart;
	req.query.timeend;

	var account;
	var obj = {};
	for(var x = 0; x < data.accounts.length; x++) {
		if(data.accounts[x].name == req.session.user_id) {
			account = data.accounts[x];
			obj.categories = account.categories;
		}
	}

	var z = req.query;
	var date = new Date(z.date);
	var month = date.getMonth();
	var day = date.getDate();
	var year = date.getFullYear();
	for(var x = 0; x < account.events.length; x++) {
		var eve = account.events[x];
		if(eve.name == z.name && eve.category.name == z.category && eve.timestart == z.timestart && eve.timeend == z.timeend && eve.date == z.date) {
			obj.eve = eve;
		}
	}

	res.render('edit', {encodedJson : encodeURIComponent(JSON.stringify(obj))});
}