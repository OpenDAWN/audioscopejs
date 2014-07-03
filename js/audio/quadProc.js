/**
 * Quadrature processor node: takes stereo in
 * and gives time domain out with 90˚ phase shift pairs
 * Due to a non-flat magnitude response, it is recommended to
 * use +-45˚ phase shift pairs using these quad signals
 */
define(['audio/hilbert', 'audio/quadChan'], function(HilbertNode, C) {

	function QuadProcessor(audio, bufLength, onProcess, fs) {
		this.hilbert = new HilbertNode(audio, fs);
		// apparently it gets gc'd if not referenced...?
		this.processor = audio.createScriptProcessor(bufLength, C.QUAD, 0);
		var merger = audio.createChannelMerger(C.QUAD);
		merger.connect(this.processor);

		var unphasedSplitter = audio.createChannelSplitter(C.LR);
		this.hilbert.unphasedNode.connect(unphasedSplitter);
		unphasedSplitter.connect(merger, C.L, C.L);
		unphasedSplitter.connect(merger, C.R, C.R);

		var phasedSplitter = audio.createChannelSplitter(C.LR);
		this.hilbert.phasedNode.connect(phasedSplitter);
		phasedSplitter.connect(merger, C.L, C.LS);
		phasedSplitter.connect(merger, C.R, C.RS);

		this.processor.onaudioprocess = onProcess;
	}
	QuadProcessor.prototype.connectToSource = function(source) {
		source.connect(this.hilbert.unphasedNode);
		source.connect(this.hilbert.phasedNode);
	};
	/**
	 * sets the overall delay (in samples)
	 * more delay means flatter magnitude response for hilbert
	 */
	QuadProcessor.prototype.setDelay = function(delay) {
		var N = delay * 2 + 1;
		this.hilbert.setFilterLength(N);
	};
	return QuadProcessor;
});
