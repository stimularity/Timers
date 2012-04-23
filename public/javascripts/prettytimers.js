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
	
	addTimer(0.25); //15 second timer
	addTimer(1);
	addTimer(10);
	addTimer(20);
	addTimer(30);
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
	$('#timers').append('<div id='+num+'_timer>'+t.update()+'</div>');
	num++;
	//When adding timers, post to database and save timer.
}

function newTimer(minutes){ //Creates a new timer objects
	
	
	//return Timer;
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