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
define(['audio/quadBuffer',
	'audio/timeAnalyzer',
	'audio/freqAnalyzer',
	'audio/quadChan'], function(QuadBuffer, TimeAnalyzer, FreqAnalyzer, C) {
	var BUFFER_LENGTH = 2.0; // seconds
	var PROCESSOR_STEP_SIZE = 1024; // 256 causes skipping

	function Analyzer(audio) {
		var fs = audio.sampleRate;
		this.audio = audio;
		this.buffer = new QuadBuffer(audio, BUFFER_LENGTH * fs, PROCESSOR_STEP_SIZE, fs);
		this.setDelay(0); // or 1023 for quad
		this.time = new TimeAnalyzer(this, PROCESSOR_STEP_SIZE);
		this.freq = new FreqAnalyzer(this);
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
		 * Sets the delay (in samples)
		 * More delay makes more accurate analytic signals
		 */
		setDelay: function(delay) {
			this.buffer.processor.setDelay(delay);
		},
		/**
		 * Puts buffer data into output arrays
		 */
		getLR: function(outL, outR, offset) {
			this.buffer.get(outL, C.L, offset || 0);
			this.buffer.get(outR, C.R, offset || 0);
		},
		getMS: function(outM, outS, offset) {
			var time = this.getLR(outM, outS, offset);
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
		getTimeDomain: function(channelFn, out1, out2) {
			this.time.getTimeDomain(channelFn, out1, out2);
		},
		getFreqDomain: function(channelFn, out1, out2) {
			this.freq.getFreqDomain(channelFn, out1, out2);
		}
	};

	return Analyzer;
});