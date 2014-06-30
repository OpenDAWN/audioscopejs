define(function() {
	var source = {};
	source.getUserMedia = function(audio, gotSource) {
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

	return source;
});
