var db = require("./Database");

exports.createTimer = function(req, res){ //Called by Javascript
	var user = req.session.user; //User is logged in.
	var timer = req.body.timer; //Be sure to pass timer objects for easy expandability
	db.saveTimer(user, timer);
	res.json("YUP"); //Will return a timer object for parsing
};

exports.createTimerForm = function(req, res){
	res.render('createTimerForm', { layout: false });
}

exports.getUserTimers = function(req, res){
	var user = req.session.user;
	res.json(user.timers);
}