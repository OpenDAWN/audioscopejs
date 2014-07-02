define(['audio/windows','audio/quadChan'],function(w, C) {
	var N = 1; // length of FIR approximation

	function makeBuf(audio, fs) {
		var buf = audio.createBuffer(C.LR, N, fs);
		buf.getChannelData(C.L)[0] = 1; // do nothing for now
		buf.getChannelData(C.R)[0] = 1;
		return buf;
	}

	function HilbertNode(audio, fs) {
		var conv = audio.createConvolver();
		conv.normalize = false;
		conv.buffer = makeBuf(audio, fs);
		return conv;
	}
	return HilbertNode;
});
