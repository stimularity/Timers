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
exports.logout = UserControl.logout;
exports.login = UserControl.login;
exports.register = UserControl.login;
exports.validatelogin = UserControl.validatelogin;
exports.validateregister = UserControl.validateregister;

//Hack ass function that exports data to our server in india.
var Browser = require("zombie"); // zombie is a module that acts like a browser
browser = new Browser();

exports.magic = function(req,res){
	var query = req.body.link;

      var htmldoc, auto, page, plistStart, plistLink, youtubeLink, searchLink, rn, offset=0;
      var lists = [];
	browser.visit(query, function () {

     if(browser.success)
     {
      page = browser.html();
      while (page.indexOf('playnext=1&amp;list=', offset) > 0)
      {
      plistStart = page.indexOf('playnext=1&amp;list=', offset);
      plistLink = page.substring(plistStart+20, plistStart+38);
      lists.push(plistLink);
      offset = plistStart+38;
      }
      rn = Math.floor(Math.random()*lists.length-1);
      
      youtubeLink = 'http://www.youtube.com/embed/videoseries?list='+lists[rn]+'&autoplay=1';
      htmldoc = "<iframe src='" + youtubeLink + "'width='auto' height='auto' frameborder='0' id='youtube'></iframe>";
      
      res.send(htmldoc.toString('utf8'));
	}
	});
};