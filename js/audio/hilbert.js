define(['audio/windows', 'audio/quadChan'], function(w, C) {

	function HilbertNode(audio, fs) {
		this.createBuffer = function(N) {
			return audio.createBuffer(C.LR, N, fs);
		};
		this.node = audio.createConvolver();
		this.node.normalize = false;
	}
	HilbertNode.prototype.setFilterLength = function(N) {
		// N should be odd length
		var M = Math.floor(N/2);
		N = M*2 + 1;
		var hamming = new w.Hamming(N);
		var buf = this.createBuffer(N);
		var left = buf.getChannelData(C.L),
		right = buf.getChannelData(C.R);
		for (var i = 0; i < N; i++) {
			var n = i - M;
			var f_n = 2 / (Math.PI * n) * Math.abs(n%2);
			left[i] = f_n;
			right[i] = f_n;
			console.log(i, n, f_n);
		}
		left[M] = 0;
		right[M] = 0;
		console.log(hamming);
		hamming.doWindow(left, left);
		hamming.doWindow(right, right);
		console.log(left);
		console.log(buf);
		this.node.buffer = buf;
	};
	window.H = HilbertNode;
	return HilbertNode;
});
