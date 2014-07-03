/**
 * Quadrature Buffer: stores time-domain data of left and right signals
 * and their corresponding hilbert transforms ie 90˚ phase shifts
 */
define(['audio/circlebuf', 'audio/quadProc', 'audio/quadChan'], function(CircleBuf, QuadProcessor, C) {
	var FS = 44100; // samples per second

	/**
	 * audio: audio context
	 * length: length of buffer
	 * stepLength: the size of the buffer that gets samples and puts it in this buffer
	 */
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
		/**
		 * Puts QuadProcessor data into buffer
		 */
		onProcess: function(e) {
			var input = e.inputBuffer;
			for (var c = 0; c < C.QUAD; c++) {
				this.bufs[c].put(input.getChannelData(c));
			}
		},
		/**
		 * Makes the position the same as position in the buffer
		 */
		refreshPosition: function() {
			this.position = this.bufs[0].totalLen;
		},
		/**
		 * Puts buffer of particular channel into output
		 * then moves the position ahead by stepLength
		 * output.length < buf.length
		 */
		get: function(output, channel, stepLength) {
			this.bufs[channel].get(output, this.position);
			this.position += stepLength;
		}
	};

	return QuadBuffer;
});
