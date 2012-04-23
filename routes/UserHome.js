var db = require("./Database");
//Login and register page
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
			if(user != null){ console.log(user.username); 
				req.session.user = user; //Super important
				res.render('index', { title: "Everything is working well" });
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