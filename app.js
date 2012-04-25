
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

//Login/register
app.get('/login', routes.login);
app.get('/register', routes.register);
app.post('/validatelogin', routes.validatelogin);
app.post('/validateregister', routes.validateregister);

//User Home
app.get('/user/:id', routes.user);

//Timer URLs
app.post('/timer/create', routes.createTimer);
app.get('/timer/createTimerForm', routes.createTimerForm);
app.get('/timer/getUserTimers', routes.getUserTimers);

//magic
app.get('/magic',routes.magic);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

//Testing area. Be careful down her'