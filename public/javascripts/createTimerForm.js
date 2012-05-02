$(document).ready(function() {
	//Timer attribute variables
	var runtime = 1;
	var minutes = false;
	var seconds = true;
	
	//Submit button
	$("#timerformsubmit").click(function() {
		submitForm();
	});//

	//Submit by hitting enter
	$('#timername').keyup(function(event) {
		if((event.keyCode || event.which) == '13'){
			submitForm();
		}
	});

	function submitForm(){
		if(seconds){ runtime = runtime/60; }

		var t = new Timer(runtime); //Create a new timer object. This is the ONLY place where this happens
		t.comment = $('#timername').val();

		//check if min or sec
		if(minutes === true && seconds === false){
			//minutes

			t.type = 1;
		}else{
			//seconds
			t.type = 0;
		}

		$.post("/timer/create", { timer:t }, function(data) {//createTimer in TimerControl.js
			if(data == 1){
				//addTimer(t);
				retrieveTimers();
				closeLightbox();
			}
			//alert("Data Loaded: " + data);
		});
	}

	//Make that title box look damn pretty
	$('#timername').focus(function(srcc) {
		if($(this).val() == $(this)[0].title) {
			$(this).removeClass("defaultTextActive");
			$(this).val("");
		}
	});

	$('#timername').blur(function() {
		if($(this).val() === "") {
			$(this).addClass("defaultTextActive");
			$(this).val($(this)[0].title);
		}
	});
	$('#timername').blur();
	
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
			$("#durationminutes").css('background','url(/images/buttonbg.png) repeat-x top #09F'); //Select
			$("#durationseconds").css('background','url(/images/buttonbg.png) repeat-x top #FFF'); //DeSelect
			minutes = true;
			seconds = false;
	});
	$("#durationseconds").click(function() {
			$("#durationseconds").css('background','url(/images/buttonbg.png) repeat-x top #09F'); //Select
			$("#durationminutes").css('background','url(/images/buttonbg.png) repeat-x top #FFF'); //Select
			seconds = true;
			minutes = false;
	});
	
});