$(document).ready(function() {
	//Timer attribute variables
	var runtime = 1;
	var minutes = false;
	var seconds = true;
	
	//Submit button
	$("#timerformsubmit").click(function() {
		
		if(seconds){ runtime = runtime/60; }
		var start = Math.round((new Date()).getTime() / 1000);
		var end = start + (runtime * 60);
		
		$.post("/timer/create", { start:start, end:end }, function(data) {
			addTimer(runtime);
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