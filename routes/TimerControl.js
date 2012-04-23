var db = require("./Database");

exports.createTimer = function(req, res){
	var user = req.session.user;
	
	res.json(user); //Will return a timer object for parsing
};

exports.createTimerForm = function(req, res){
	res.render('createTimerForm', { layout: false });
}