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

var User = mongoose.model('Users', Userschema);
var Timer = mongoose.model('Timers', Timerschema);

exports.validateUser = function(username, password, cb){
	User.findOne({username:username, password:password}).run(function (err, user) {
		cb(user);
	});
}

exports.newUser = function(username, password, email){
	var user = new User();
	user.username = username;
	user.password = password;
	user.name.first = "Chedder";
	user.name.last = "McDougan";
	user.email = email;
	
	user.save(function(err, user_Saved){
		if(err){
			//throw err;
			console.log(err);
			return "Something is fucked.";
		}else{
			//console.log('saved!');
			return "User Saved. Have a nice Day.";
		}
	});
}