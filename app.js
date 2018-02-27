
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
//var bodyParser = require('body-parser');

var login = require('./routes/login');
var signup = require('./routes/signup');
var calendar = require('./routes/calendar');
var addevent = require('./routes/addevent');
var graph = require('./routes/graph');
var settings = require('./routes/settings');
var edit = require('./routes/edit');


// Example route
// var user = require('./routes/user');
var add = require('./routes/add');
var addaccount = require('./routes/addaccount');
var addCategory = require('./routes/addcategory');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.view);
app.post('/loginacc', login.login);	
app.get('/calendar', auth, calendar.view);
app.get('/signup', signup.view);
app.get('/addevent', auth, addevent.view);
app.get('/graph', auth, graph.view);
app.get('/settings', auth, settings.view);
app.get('/calendardate', auth, calendar.date);
app.get('/graphweek', auth, graph.week);
app.get('/graphmonth', auth, graph.month);
app.get('/graphyear', auth, graph.year);
app.post('/addaccount', addaccount.addAccount);
app.get('/signout', login.signout);
app.get('/login', login.view);
app.get('/loginerror', login.err);
app.get('/edit', auth, edit.view);

// view route
// app.get('/users', user.list);
app.get('/add', auth, add.addEvent);
app.get('/addcategory', auth, addCategory.addCategory);

function auth(req, res, next) {
	if(!req.session.user_id){
		res.redirect('/');
	}
	else{
		next();
	}
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
