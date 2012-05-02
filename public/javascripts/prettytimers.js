var num = 0;
var timers = [];
var timersOnScreen = 0;
//Javascript Timer Object
function Timer(minutes) {
	this.id = 0;
	this._id = "";
	this.start = Math.round((new Date()).getTime() / 1000);
	this.end = this.start + (minutes * 60);
	this.duration = minutes;
	this.type = 0; //default 0 = seconds, 1 = minutes
	this.comment = "";
	this.update = function(reset){

		if(reset == 1){
			this.start = Math.round((new Date()).getTime() / 1000);
			this.end = this.start + (this.duration * 60);

			$.post("/timer/update", { timer:this }, function(data) {//updateTimer in TimerControl.js
			if(data == 1){
				
			}
		});

		}

		now = this.start = Math.round((new Date()).getTime() / 1000); //Current time
		remaining = (this.end - now); //End time of the timer
		var text = "Finished";
		if(remaining-1 >= 0) { text = (Math.ceil((remaining/60)-1) + ":" + remaining%60); }
		$('#'+this.id+'_ticker').text(text); //Update their own text
		var progress = (100 - (Math.ceil(((remaining/60 )/this.duration)*100))); //Reverse percentace of timer
		if(progress >= 100){ progress = 100;}
		var bar = (progress/100) * 550;
		$('#'+this.id+'_timer').find('.progress').text(progress + "%").css({'width':bar});
	};
}
//Timer Object

// JavaScript Document bitch
$(document).ready(function() {
	//Make Logo super pretty
	//Animation for site logo
	$('#moodlogo').hover(
	function () { //Fade in logo
		$('#hiddenlogo').stop().fadeTo(2000,1);
	},
	function () { //fade out logo.
		$('#hiddenlogo').stop().fadeTo(500,0);
	});
	
	//run a shitty loop to time timers.
	window.setInterval(updateTimers, 1000);
	
	
	$("#newtimer").click(function() { //Open New Timer box
			$.get("/timer/createTimerForm", function(data) { lightBox(600,400,data); });
	});

	retrieveTimers();
	
});

function retrieveTimers(){

	$.getJSON("/timer/getUserTimers", function(data) { //Load users timers
		//alert(data.length + " " + timersOnScreen);
		for(var i=timersOnScreen; i < data.length; i++)
		{
			var t = new Timer();
			t.start = data[i].start;
			t.end = data[i].end;
			t.comment = data[i].comment;
			t.duration = data[i].duration;
			t._id = data[i]._id;
			t.type = data[i].type;
			
			addTimer(t);

			timersOnScreen ++;
		}
	});
}


function updateTimers(){
	for(var i=0; i<timers.length; i++){
		timers[i].update(0);
	}
}


function addTimer(timer){ //Adds timer to document
	//timers.push( new Timer(minutes) );
	//var t = new Timer(num, minutes);
	var timeType;
	var timeAmount;
	//set up the min or sec display

	if(timer.type == 1){
		timeType = 'Minutes';
		timeAmount = timer.duration;
	}
	if(timer.type === 0){
		timeType = 'Seconds';
		timeAmount = timer.duration*60;
	}

	num++;
	timer.id = num; //Add an ID so the timer can be located in the dom.
	timers.push(timer);

	
	//This is going to be so ugly, but its the easiest way.
	$('#timers').append(
		'<div id="'+num+'_timer" class="timerentry" class="timerbutton">'+
			'<div class="timercomment">'+timer.comment+'</div>'+
			'<div id="'+num+'_ticker" class="timerdisplay"></div>'+
			'<div class="removetimerbutton"></div>'+
			'<div class="restarttimerbutton"></div>'+
			'<div class="timerduration">Duration: '+timeAmount +' '+timeType+'</div>'+
			'<div class="progressbar"><div class="progress"></div></div>'+
			'<div class="timerid">'+timer._id+'</div>'+
		'</div>'
	);

	bindTimerButtons();
	
}

function bindTimerButtons(){
	
	$('.removetimerbutton').unbind(); //Unbind all previous events so they dont overlap
	$('.restarttimerbutton').unbind(); //Unbind all previous events so they dont overlap

	$('.removetimerbutton').click(function(){ //Event for when the timers delete button is clicked
		var index = ($(this).parent().attr("id").substring(0,1)) - 1; //Get ID of timer in global timer array.
		//alert(timers[index].comment);
		//var id = $(this).parent().find('.timerid');
		var box = $(this).parent();
		$.post("/timer/delete", { timer:timers[index] }, function(data) {//deleteTimer in TimerControl.js
			if(data == 1) {
				timersOnScreen--;
				box.fadeOut('slow'); //Remove timer on success
			}
		});
	});
	$('.restarttimerbutton').click(function(){
		var index = ($(this).parent().attr("id").substring(0,1)) - 1;
		var t = timers[index];
		t.update(1);
	});
}

//Max's custom animated lightbox plugin. Quite magical.
function lightBox(w,h,content){
	$('html').prepend('<div id="lightbox"></div>').fadeIn(400); //Add outer box
	$('#lightbox').css({'height':$(document).height(), 'width':$(document).width()});
	$("#lightbox").click(function() {
		closeLightbox();
	});
	$('body').prepend('<div id="lightboxcore"></div>'); //Append inner box
	$('#lightboxcore').css({'height':5, 'width':5});
    $('#lightboxcore').css("top", (($(window).height() - $('#lightboxcore').outerHeight()) / 2) +  $(window).scrollTop() + "px");
    $('#lightboxcore').css("left", (($(window).width() - $('#lightboxcore').outerWidth()) / 2) +  $(window).scrollLeft() + "px");
	$('#lightboxcore').animate({
		width: [w, 'swing'], left: '-='+(w/2),
		height: [h, 'swing'], top: '-='+(h/2)
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