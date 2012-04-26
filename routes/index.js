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
exports.deleteTimer = TimerControl.deleteTimer;
exports.createTimerForm = TimerControl.createTimerForm;
exports.getUserTimers = TimerControl.getUserTimers;

//Login/register pages and functions
exports.login = UserControl.login;
exports.register = UserControl.login;
exports.validatelogin = UserControl.validatelogin;
exports.validateregister = UserControl.validateregister;

var Browser = require("zombie");

// Load the page from localhost
browser = new Browser();
exports.magic = function(req,res){
	var msg = "relaxing";
	var youtubeLink = 'http://www.youtube.com/results?search_query=' + msg + '+music%2Cplaylist';
	var query = youtubeLink;
	browser.visit(query, function () {
		if(browser.success) {
			var page = browser.html();
			var videoStart = page.indexOf('/watch?v=');
			var videoLink = page.substring(videoStart+9, videoStart+20);
			var plistStart = page.indexOf('list=');
			var plistLink = page.substring(plistStart+5, plistStart+23);
			//https://www.youtube.com/watch?v=H6n324LCe_0&feature=autoplay&list=PL493328AA49F65CE5&playnext=2
			youtubeLink = 'http://www.youtube.com/watch?v=' + videoLink + '&feature=autoplay&playnext=2&list=' + plistLink;
			console.log(youtubeLink);
			res.render('redirect', { layout: false, link:youtubeLink});
		}
		else {
			res.render('index', { title: "It didnt work. Sorry."});
		}
	});
	
};