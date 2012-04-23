
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
app.get('/user/:id', routes.home);


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

//Testing area. Be careful down her'
//Global Vars
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
//Connect to database
var db = mongoose.connect('mongodb://127.0.0.1/learningmongo');

var Userschema = new Schema({
	username	:{ type: String, index: true, unique: true, lowercase: true },
	name		:{ first: String, last : String },
	email		:{ type: String, required: true, index: { unique: true, sparse: true } },
	password	:{ type: String, required: true}, 
	timers		:[Timerschema]
});

var Timerschema = new Schema({
	start		:Date,
	end			:Date,
	repeat		:Number,
	interval	:Number,
	type		:Number,
	comment		:String,
});
/*
var OtherUserschema = new Schema({
    title     : { type: String, index: true }
  , slug      : { type: String, lowercase: true, trim: true }
  , date      : Date
  , buf       : Buffer
  , comments  : [Comment]
  , creator   : Schema.ObjectId
});
*/
var t;
var User = mongoose.model('Users', Userschema);
var Timer = mongoose.model('Timers', Timerschema);

function validateUser(username, password, cb){
	User.findOne({username:username, password:password}).run(function (err, user) {
		//console.log(user);
		return cb(user);
	});
}

validateUser("test","Password", function(user){
	if(user != null){ console.log(user.username);} else { console.log("Something fucked"); }
});