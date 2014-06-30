/**
 * Quadrature Buffer: stores time-domain data of left and right signals
 * and their corresponding hilbert transforms ie 90˚ phase shifts
 */
define(['audio/circlebuf', 'audio/quadProc', 'audio/quadChan'], function(CircleBuf, QuadProcessor, C) {
	var FS = 44100; // samples per second
	var QUAD = 4; // quadruple/quadratureLR

	function QuadBuffer(audio, length, stepLength, fs) {
		this.position = 0;
		this.bufs = [];
		this.bufs[C.L] = new CircleBuf(length);
		this.bufs[C.R] = new CircleBuf(length);
		this.bufs[C.LS] = new CircleBuf(length);
		this.bufs[C.RS] = new CircleBuf(length);
		this.processor = new QuadProcessor(audio, stepLength, this.onProcess, fs);
	}

	QuadBuffer.prototype = {
		onProcess: function(e) {
			var input = e.inputBuffer;
			for (var c = 0; c < QUAD; c++) {
				var channel = input.getChannelData(c);
			}
		},
		get: function(output, stepLength) {

		}
	};

	return QuadBuffer;
});
