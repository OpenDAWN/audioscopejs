/**
 * Processes stereo signals and outputs 90˚phase shifted signal
 * and a properly delayed unphase-shifted signal
 */
define(['audio/windows', 'audio/quadChan'], function(w, C) {

	function HilbertNode(audio) {
		this.createBuffer = function createBuffer(N) {
			return audio.createBuffer(C.LR, N, audio.sampleRate);
		};
		// delay node has additional smoothing processing so do this instead
		this.unphasedNode = audio.createConvolver();
		this.phasedNode = audio.createConvolver();
		this.unphasedNode.normalize = false;
		this.phasedNode.normalize = false;
	}
	/* don't call this too often, making buffers/arrays take a while */
	HilbertNode.prototype.setFilterLength = function(N) {
		if (N < 2) {
			this.setNoFilter();
			return;
		}
		// N should be odd length
		var M = Math.floor(N / 2);
		N = M * 2 + 1;

		// delay unphased
		var delayIR = this.createBuffer(M);
		delayIR.getChannelData(C.L)[M-1] = 1;
		delayIR.getChannelData(C.R)[M-1] = 1;
		this.unphasedNode.buffer = delayIR;

		// generate phased IR
		var hilbertIR = this.createBuffer(N);
		var left = hilbertIR.getChannelData(C.L),
			right = hilbertIR.getChannelData(C.R);
		for (var i = 0; i < N; i++) {
			var n = i - M;
			var f_n = 2 / (Math.PI * n) * Math.abs(n % 2);
			left[i] = f_n;
			right[i] = f_n;
		}
		left[M] = 0;
		right[M] = 0;
		var hamming = new w.Hamming(N);
		hamming.doWindow(left, left);
		hamming.doWindow(right, right);
		this.phasedNode.buffer = hilbertIR;
	};
	HilbertNode.prototype.setNoFilter = function() {
		var buf = this.createBuffer(1);
		buf.getChannelData(C.L)[0] = 1;
		buf.getChannelData(C.R)[0] = 1;
		this.unphasedNode.buffer = buf;
		this.phasedNode.buffer = buf;
	};
	return HilbertNode;
});
