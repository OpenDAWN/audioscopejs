/**
 * Quadrature processor node: takes stereo in
 * and gives time domain out with 90˚ phase shift pairs
 */
define(['audio/hilbert'], function(HilbertNode) {
	var L = 0,
		R = 1,
		Ls = 2, // phase shifted 90 degrees channels
		Rs = 3,
		LR = 2,
		QUAD = 4; // quadruple/quadratureLR

	function QuadProcessor(audio, bufLength, onProcess, fs) {

		var hilbert = new HilbertNode(audio, fs);
		// apparently it gets gc'd if not referenced...?
		this.processor = audio.createScriptProcessor(bufLength, QUAD, 0);
		var inputSplitter = audio.createChannelSplitter(LR);
		var hilbertSplitter = audio.createChannelSplitter(LR);
		var inputMerger = audio.createChannelMerger(QUAD);

		hilbert.connect(hilbertSplitter);
		inputSplitter.connect(inputMerger, L, L);
		inputSplitter.connect(inputMerger, R, R);
		hilbertSplitter.connect(inputMerger, L, Ls);
		hilbertSplitter.connect(inputMerger, R, Rs);
		inputMerger.connect(processor);

		this.connectToSource = function(source) {
			source.connect(inputSplitter);
			source.connect(hilbertNode);
		};

		this.processor.onaudioprocess = onProcess;
	}
	return QuadProcessor;
});
