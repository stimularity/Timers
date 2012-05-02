var db = require("./Database");

//Timer manipulation functions
exports.createTimer = function(req, res){ //Called by Javascript
	var user = req.session.user; //User is logged in.
	var timer = req.body.timer; //Be sure to pass timer objects for easy expandability
	db.saveTimer(user, timer, function(success, newuser){
		if(success){
			req.session.user = newuser; //Update user session key.
			res.send("1");
		} else {
			res.send("0");
		}
	});
};
exports.deleteTimer = function(req, res){

	if(req.body.timer == null){
		res.send("0");
		return;
	}

	var user = req.session.user; //User is logged in.
	var timer = req.body.timer; //Be sure to pass timer objects for easy expandability
	db.deleteTimer(user, timer, function(success, newuser){
		if(success){
			req.session.user = newuser; //Update user session key.
			res.send("1");
		} else {
			res.send("0");
		}
	}); //Timer object, as usual.
};

exports.updateTimer = function(req,res){

	var user = req.session.user; //User is logged in.
	var timer = req.body.timer; //Be sure to pass timer objects for easy expandability
	db.updateTimer(user, timer, function(success, newuser){
		if(success){
			req.session.user = newuser; //Update user session key.
			res.send("1");
		} else {
			res.send("0");
		}
	}); //Timer object, as usual.

}

//Create Timer form, for timer creation
exports.createTimerForm = function(req, res){
	res.render('createTimerForm', { layout: false });
};

exports.getUserTimers = function(req, res){ //Returs JSON of users timers

	//check if user is logged in first
	if(req.session.user != null){

		var user = req.session.user;
		db.validateUser(user.username, user.password, function(newuser){
		req.session.user = newuser; //Pulls new user object form database each time.
		res.json(user.timers);
		});
	}
};