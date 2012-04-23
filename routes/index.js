var db = require("./Database");
var usercontrol = require("./UserControl"); //Login and register functions and related functions


//Index
exports.index = function(req, res){
  res.render('index', { title: 'MoodTimer' })
};

//User Home
exports.index = function(req, res){
  res.render('index', { title: 'User Home' })
};

//Login/register pages and functions
exports.login = usercontrol.login;
exports.register = usercontrol.login;
exports.validatelogin = usercontrol.validatelogin;
exports.validateregister = usercontrol.validateregister;