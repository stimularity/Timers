var Browser = require("zombie"); // zombie is a module that acts like a browser
browser = new Browser();

exports.index = function(req, res) {
	res.render('index', {
		title : 'Get random youtube videos!'
	});
};

/*
      Magic has to be a route due to asynchronous nature of javascript.
*/

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