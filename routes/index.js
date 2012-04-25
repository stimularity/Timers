var db = require("./Database"); //Database functions and schema

var UserControl = require("./UserControl"); //Login and register functions and related functions
var TimerControl = require("./TimerControl"); //Functions for timer management


//Index
exports.index = function(req, res){
  res.render('index', { title: 'MoodTimer' });
};

//User Home
exports.user = UserControl.home;

//Timer Management Routes
exports.createTimer = TimerControl.createTimer;
exports.createTimerForm = TimerControl.createTimerForm;
exports.getUserTimers = TimerControl.getUserTimers;

//Login/register pages and functions
exports.login = UserControl.login;
exports.register = UserControl.login;
exports.validatelogin = UserControl.validatelogin;
exports.validateregister = UserControl.validateregister;