
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var login = require('./routes/login');
var signup = require('./routes/signup');
var calendar = require('./routes/calendar');
var addevent = require('./routes/addevent');
var graph = require('./routes/graph');
var settings = require('./routes/settings');



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
app.get('/login', login.view);	
app.get('/calendar', calendar.view);
app.get('/signup', signup.view);
app.get('/addevent', addevent.view);
app.get('/graph', graph.view);
app.get('/settings', settings.view);

// Example route
// app.get('/users', user.list);
app.get('/add', add.addEvent);
app.get('/addcategory', addCategory.addCategory);
app.get('/addaccount', addaccount.addAccount);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
