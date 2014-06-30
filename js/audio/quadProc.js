/**
 * Quadrature processor node: takes stereo in
 * and gives time domain out with 90˚ phase shift pairs
 */
define(['audio/hilbert','audio/quadChan'], function(HilbertNode, C) {

	function QuadProcessor(audio, bufLength, onProcess, fs) {
		var hilbert = new HilbertNode(audio, fs);
		// apparently it gets gc'd if not referenced...?
		this.processor = audio.createScriptProcessor(bufLength, C.QUAD, 0);
		var inputSplitter = audio.createChannelSplitter(C.LR);
		var hilbertSplitter = audio.createChannelSplitter(C.LR);
		var inputMerger = audio.createChannelMerger(C.QUAD);

		hilbert.connect(hilbertSplitter);
		inputSplitter.connect(inputMerger, C.L, C.L);
		inputSplitter.connect(inputMerger, C.R, C.R);
		hilbertSplitter.connect(inputMerger, C.L, C.Ls);
		hilbertSplitter.connect(inputMerger, C.R, C.Rs);
		inputMerger.connect(processor);

		this.connectToSource = function(source) {
			source.connect(inputSplitter);
			source.connect(hilbertNode);
		};

		this.processor.onaudioprocess = onProcess;
	}
	return QuadProcessor;
});
