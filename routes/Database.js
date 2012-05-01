//Global Vars
var mongoose = require('mongoose') , Schema = mongoose.Schema;
//Connect to database
var db = mongoose.connect('mongodb://127.0.0.1/learningmongo');

var Timerschema = new Schema({
	start		:Number,
	end			:Number,
	duration	:Number,
	repeat		:Number,
	interval	:Number,
	type		:Number,
	comment		:String
});

var Userschema = new Schema({
	username	:{ type: String, index: true, unique: true, lowercase: true },
	name		:{ first: String, last : String },
	email		:{ type: String, required: true, index: { unique: true, sparse: true } },
	password	:{ type: String, required: true},
	timers		:[Timerschema]
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

var User = mongoose.model('Users', Userschema);
var Timer = mongoose.model('Timers', Timerschema);

//Timer functions
exports.saveTimer = function(user,timer,cb){
	newt = new Timer();
	newt.start = timer.start;
	newt.end = timer.end;
	newt.duration = timer.duration;
	newt.comment = timer.comment;
	newt.type = timer.type;

	//Update this function, make it better!!
	//http://mongoosejs.com/docs/updating-documents.html

	User.findOne({username:user.username, password:user.password}).run(function (err, query) {
		query.timers.push(newt);
		query.save(function (err) {
			if(!err){ cb(true, query); }
			else { cb(false, null); }
		});
	});
};

exports.deleteTimer = function(user,timer,cb){
var query;
console.log("deleting " + timer._id + " for user " + user.name.first);

	if(timer == null){
		console.log("woaaah doggy");
		return;

	}

	User.findOne({username:user.username, password:user.password}).run(function (err, query) {
		console.log(query);
		if(!err){
		query.timers.id(timer._id).remove();
		query.save(function (err) {
			if(!err){ 

				cb(true, query); 
			}
			else { 
				cb(false, null); 
			}
		});
	}
	
	});
};

//User Functions
exports.validateUser = function(username, password, cb){
	User.findOne({username:username, password:password}).run(function (err, user) {
		cb(user);
	});
};

exports.newUser = function(req, res, fname,lname,username, password, email){

var user = new User();
	user.username = username;
	user.password = password;
	user.name.first = fname;
	user.name.last = lname;
	user.email = email;

	User.findOne({username:username}).run(function(err, query){
		if(query != null){
		console.log("duplicate dude");
			//we already have this username in the DB! error and try again
			res.render('loginregister', { title: "Username already in use, try again.", name: "Not Logged In" });
			//return "Username already in use, try again!";
			
		}else{
		
console.log("its fine");
	
	user.save(function(err, user_Saved){
		if(err){
			throw err;
			//console.log(err);
			//return "Something is fucked.";
		}else{
			console.log('saved!');
			res.render('loginregister', { title: "Creation successful! Please login.", name: "Not Logged In" });
			//return "Creation successful! Please login now.";
		}
	});
	}
	});
}