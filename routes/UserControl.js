var db = require("./Database");

exports.home = function(req, res){
	var user = req.session.user;
	//if(req.params.id != req.session.user.username){ res.redirect("home"); } //Security, not finished.
	//Load timers and all that shit via Jquery
	
	res.render('home', { title: user.name.first})
};


//Login and register page - A static page that is lame. I think it sucks...
exports.login = function(req, res){
  res.render('loginregister', { title: 'Login/Register' })
};

//post page for checking log in information
exports.validatelogin = function(req, res){
	var message = "That didnt work at all...";
	var uname = req.body.usname;
	var pword = req.body.password3;
	if(uname != null && pword != null){
		console.log("Attempting to validate user.");
		db.validateUser(uname,pword, function(user){
			if(user !== null){ console.log(user.username);
				req.session.user = user;
				res.redirect('/user/'+user.username);
			}
			else { res.render('index', { title: "Not Working" }); }
		});
	}
};

//Post page for checking registration information
exports.validateregister = function(req, res){
  	var message = "That didnt work at all...";
	var uname = req.body.name;
	var pword = req.body.password1; 
	var email = req.body.email;
	if(uname != null && pword != null && email != null){
		message = db.newUser(uname,pword,email);
	}
	
	res.render('index', { title: message })
};