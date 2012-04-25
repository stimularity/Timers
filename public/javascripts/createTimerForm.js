$(document).ready(function() {
	//Timer attribute variables
	var runtime = 1;
	var minutes = false;
	var seconds = true;
	
	//Submit button
	$("#timerformsubmit").click(function() {

		
		if(seconds){ runtime = runtime/60; }

		var t = new Timer(runtime); //Create a new timer object. This is the ONLY place where this happens
		$.post("/timer/create", { timer:t }, function(data) {//createTimer in TimerControl.js
			//alert(data);
			addTimer(t);
			closeLightbox();
			//alert("Data Loaded: " + data);
		});
			
	});//
	
	/* var Timerschema = new Schema({ //Ref
		start		:Date,
		end			:Date,
		repeat		:Number,
		interval	:Number,
		type		:Number,
		comment		:String,
	}); */
	
	//Timer window and duration adjustment buttons
	$("#durationminus").click(function() {
			runtime--;
			if(runtime <= 0){ runtime = 59; }
			updateDuration(runtime);
	});
	$("#durationplus").click(function() {
		runtime++;
		if(runtime >= 60){ runtime = 1; }
		updateDuration(runtime);
	});
	
	function updateDuration(val) {
		$('#duration').text("").text(val);
	}
	
	//Minutes and seconds buttons.
	$("#durationminutes").click(function() {
			$("#durationminutes").css('background','#09F'); //Select
			$("#durationseconds").css('background','#FFF'); //DeSelect
			minutes = true;
			seconds = false;
	});
	$("#durationseconds").click(function() {
			$("#durationseconds").css('background','#09F'); //Select
			$("#durationminutes").css('background','#FFF'); //Select
			seconds = true;
			minutes = false;
	});
	
});