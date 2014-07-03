/**
 * Connects to user's microphone and sends it to the callback
 */
define(function() {
	return function(audio, gotSource) {
		navigator.getUserMedia({
			audio: true
		}, function(stream) {
			var input = audio.createMediaStreamSource(stream);
			gotSource(input);
		}, function(e) {
			alert('Error getting audio');
			console.log(e);
		});
	};
});
