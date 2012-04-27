var msg;
var state = 0; // 0 - music. 1 - artist
var lastRequest;

$(document).ready(function() {

	////////// handle user input into the textarea

	$('#message').keyup(function(event) {
		msg = $('#message').val();
		if(msg.length > 0) {
			$("#send").text('Send');
			if((event.keyCode || event.which) == '13') {
				msg = msg.substring(0, msg.length - 1);
				submit(msg);
				$('#message').addClass("defaultTextActive");
				$('#message').val('');
				$('#message').blur();
				$("#send").text("Doesn't work? Try again!");
				}
		}
	});

	$("#send").mousedown(function() {
		if (msg.length === 0 && lastRequest)
		{
			submit(lastRequest);
			$("#send").text("Send");
		}
		submit(msg);
		$('#message').blur();
		$('#message').addClass("defaultTextActive");
		$('#message').val('');
	});

	$("#status").mousedown(function() {
		if (state === 0)
		{	$("#status").blur();
			$("#status").text("specific artist");
			$("#status").show();
			state = 1;
		}
		else
		{	$("#status").blur();
			$("#status").text("music");
			$("#status").show();
			state = 0;
		}
	});

	$('#message').focus(function(srcc) {
		if($(this).val() == $(this)[0].title) {
			$(this).removeClass("defaultTextActive");
			$(this).val("");
		}
	});

	$('#message').blur(function() {
		if($(this).val() === "") {
			$(this).addClass("defaultTextActive");
			$(this).val($(this)[0].title);
		}
	});

	$('#message').blur();
	
});


function submit(msg) {
	var yt_string;
	if (state === 0)
		yt_string = 'http://www.youtube.com/results?search_query=' + msg + '%20music%2Cplaylist';
	if (state === 1)
		yt_string = 'http://www.youtube.com/results?search_query=' + msg + '%2Cplaylist';
	lastRequest = yt_string;
	$.post("/magic", {link : yt_string}, function(data) {
		$('#youtube').remove();
		$('#video').append(data);
		});
}

