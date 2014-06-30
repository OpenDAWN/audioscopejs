define(function() {
	var LR = 2;
	var N = 1; // length of FIR approximation

	function makeBuf(audio, FS) {
		var buf = audio.createBuffer(LR, N, FS);
		buf.getChannelData(0)[0] = 1; // do nothing for now
		buf.getChannelData(1)[0] = 1;
		return buf;
	}

	function HilbertNode(audio, FS) {
		var conv = audio.createConvolver();
		conv.normalize = false;
		conv.buffer = makeBuf(audio, FS);
		return conv;
	}
	return HilbertNode;
});
