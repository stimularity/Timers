var num = 0;
//Javascript Timer Object
function Timer(id, minutes) {
	this.id = id;
	this.start = Math.round((new Date()).getTime() / 1000);
	this.end = this.start + (minutes * 60);
	this.t = minutes;
	this.update = function(){
		now = this.start = Math.round((new Date()).getTime() / 1000);
		remaining = (this.end - now);
		var text = "Finished"
		if(remaining-1 >= 0) { text = (Math.ceil((remaining/60)-1) + ":" + remaining%60); } 
		$('#'+this.id+'_timer').text(text);
	};
}
//Timer Object

// JavaScript Document bitch
$(document).ready(function() {
	//Function to get all saved timers.
	
	//run a shitty loop to time timers.
	window.setInterval(updateTimers, 1000);
	
	/*
	addTimer(30/60); //30 second timer
	addTimer(1);
	addTimer(10);
	addTimer(20);
	addTimer(30);
	
	newTimer(4); */
	
	
	
	$("#newtimer").click(function() { //Open New Timer box
			$.get("/timer/createTimerForm", function(data) { lightBox(600,400,data); });
	});
});

var timers = [];
function updateTimers(){
	for(var i=0; i<timers.length; i++){
		timers[i].update();
	}
}


function addTimer(minutes){ //Adds timer to document
	//timers.push( new Timer(minutes) );
	var t = new Timer(num, minutes);
	timers.push(t);
	$('#timers').append('<div id='+num+'_timer>'+t.update()+'</div>').hide().fadeIn('slow');
	num++;
	//When adding timers, post to database and save timer.
}

function newTimer(minutes){ //Creates a new timer objects saves them.
	$.post("/timer/create", function(data) {
		//alert(data);
	});
	//return Timer;
}


//Max's custom animated lightbox plugin. Quite magical.
function lightBox(w,h,content){
	$('html').prepend('<div id="lightbox"></div>').fadeIn(400); //Add outer box
	$("#lightbox").click(function() {
		closeLightbox();
	});
	$('body').prepend('<div id="lightboxcore"></div>'); //Append inner box
	$('#lightboxcore').css({'height':5, 'width':5});
    $('#lightboxcore').css("top", (($(window).height() - $('#lightboxcore').outerHeight()) / 2) +  $(window).scrollTop() + "px");
    $('#lightboxcore').css("left", (($(window).width() - $('#lightboxcore').outerWidth()) / 2) +  $(window).scrollLeft() + "px");
	$('#lightboxcore').animate({
		width: [w, 'swing'], left: '-='+(w/2),
		height: [h, 'swing'], top: '-='+(h/2),
		}, 500, function() {
			$('#lightboxcore').append(content);
	});
}
function closeLightbox(){
	$('#lightbox').fadeOut(500);
	$('#lightboxcore').fadeOut(300);
}

/*

var unixTimestamp = Math.round((new Date()).getTime() / 1000);

var Timerschema = new Schema({ //Ref
	start		:Date,
	end			:Date,
	repeat		:Number,
	interval	:Number,
	type		:Number,
	comment		:String,
});

*/