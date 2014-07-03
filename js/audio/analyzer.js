/**
 * Takes stereo (with 90˚ phase shift pair for converting to analytic)
 * and outputs frames of various representations of the signals:
 ** Signal combinations **
 * Left / Right
 * Mid / Side
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
define(['audio/quadBuffer'], function(QuadBuffer) {
	var BUFFER_LENGTH = 1.0; // seconds
	var PROCESSOR_STEP_SIZE = 256;

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
			this.buffer.processor.connectToSource(inputNode);
		},
		/**
		 * Sets the delay (in seconds)
		 * More delay makes more accurate analytic signals
		 */
		setDelay: function(delay) {
			this.buffer.processor.setDelay(delay * this.audio.fs);
		},
		/**
		 * Sets how frequently frames will be obtained
		 */
		setFps: function(fps) {
			this.stepSize = Math.floor(this.audio.sampleRate / fps);
		}
	};

	return Analyzer;
});
