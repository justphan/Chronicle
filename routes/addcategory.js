var data = require("../accounts.json");

exports.addCategory = function(req, res) {

	console.log("adding category");
	//var post_body = req.bdy;
	var query = req.query;

	var category = {
		"name": query.newCategory
	};

	for(account in data.accounts) {
		account.categories.push(category);
	}
	data.categories.push(category);
	res.render('addevent');
}