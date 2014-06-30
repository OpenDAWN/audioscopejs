define(['audio/input', 'audio/quadBuffer'], function(input, QuafBuffer) {
	var PROCESSOR_BUFFER_SIZE = 256;

	var Analyzer = {};
	var audio;

	Analyzer.init = function() {
		audio = new AudioContext();
		// var buffer = new Buffer(audio, PROCESSOR_BUFFER_SIZE);

		input.getUserMedia(function(inputNode) {
			// buffer.connectToSource(inputNode);
		});
	};
	return Analyzer;
});
