/**
 * Takes stereo (with 90˚ phase shift pair for converting to analytic)
 * and outputs frames of various representations of the signals:
 ** Signal combinations **
 * Left / Right
 * Mid / Side (Left is positive)
 ** Time Domain **
 * Mono amplitude
 ** Frequency Domain **
 * Mono magnitude
 * Stereo phase difference + Total magnitude + Panning
 ** Analytic **
 * Mono Real + Imaginary amplitude
 * Mono Magnitude + Phase
 * Mono Magnitude + (instantaneous) Frequency
 * Stereo phase difference + Total magnitude + Panning
 */
define(['audio/quadBuffer', 'audio/quadChan'], function(QuadBuffer, C) {
	var BUFFER_LENGTH = 1.0; // seconds
	var PROCESSOR_STEP_SIZE = 2048; // 1024 may cause skipping

	function Analyzer(audio) {
		var fs = audio.sampleRate;
		this.audio = audio;
		this.buffer = new QuadBuffer(audio, BUFFER_LENGTH * fs, PROCESSOR_STEP_SIZE, fs);
	}

	Analyzer.prototype = {
		/* functions that should be called to further initialize */
		/**
		 * Takes a node producing audio output for analysis
		 */
		setInput: function(input) {
			this.buffer.processor.connectToSource(input);
		},
		/**
		 * Sets the delay (in seconds)
		 * More delay makes more accurate analytic signals
		 */
		setDelay: function(delay) {
			this.buffer.processor.setDelay(delay * this.audio.sampleRate);
		},
		/**
		 * Puts buffer data into output arrays
		 */
		getLR: function(outL, outR) {
			this.buffer.get(outL, C.L);
			this.buffer.get(outR, C.R);
		},
		getMS: function(outM, outS) {
			this.getLR(outM, outS);
			for (var i = 0; i < outM.length; i++) {
				// var left = outM[i];
				// var right = outS[i];
				// outM[i] = (left + right) / 2;
				// outS[i] = (left - right) / 2;
				/* you can do the algebra */
				outM[i] = (outM[i] + outS[i]) / 2;
				outS[i] = outM[i] - outS[i];
			}
		},
		/**
		 * Mono functions take one of the ChannelFn from above
		 */
		getTimeDomain: function(channelFn, out1, out2) {
			channelFn.call(this, out1, out2);
		}

	};

	return Analyzer;
});
