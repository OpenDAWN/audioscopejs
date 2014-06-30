/**
 * Quadrature Buffer: stores time-domain data of left and right signals
 * and their corresponding hilbert transforms ie 90˚ phase shifts
 */
define(['audio/circlebuf', 'audio/quadProc'], function(CircleBuf, QuadProcessor) {
	var FS = 44100; // samples per second
	var QUAD = 4; // quadruple/quadratureLR

	function QuadBuffer(audio, length, stepLength, fs) {
		this.position = 0;
		this.bufs = {
			L: new CircleBuf(length),
			R: new CircleBuf(length),
			Ls: new CircleBuf(length),
			Rs: new CircleBuf(length),
		};
		this.processor = new QuadProcessor(audio, stepLength, this.onProcess, fs);
	}

	QuadBuffer.prototype = {
		onProcess: function () {

		},
		get: function (output, stepLength) {

		}
	};

	return QuadBuffer;
});
