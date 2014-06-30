define(['audio/circlebuf','audio/hilbert'], function(CircleBuf, HilbertNode) {
	var FS = 44100;
	var L = 0,
		R = 1,
		Ls = 2, // phase shifted 90 degrees
		Rs = 3,
		LR = 2,
		QUAD = 4; // quadruple/quadratureLR

	function QuadBuffer(audio, frameLength, bufferLength, stepLength) {
		var hilbert = new HilbertNode(audio, FS);
		// apparently it gets gc'd if not referenced...?
		this.processor = audio.createScriptProcessor(frameLength, QUAD, 0);
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

		this.buf = new Float32Array(bufferLength * QUAD);
		this.length = bufferLength;
		this.frameLength = frameLength;
		this.framePos = 0;
		this.outPos = 0;
		this.stepLength = stepLength;

		processor.onaudioprocess = this.onAudioProcess;
	}

	QuadBuffer.prototype.getPos = function(channel, i, bufStart) {
		return (channel * this.length + (bufStart + i) % this.length);
	};

	QuadBuffer.prototype.onAudioProcess = function(e) {
		var input = e.inputBuffer;
		for (var c = 0; c < QUAD; c++) {
			var channel = input.getChannelData(c);
			for (var i = 0; i < this.length; i++) {
				this.buf[this.getPos(c, i, this.framePos)] = channel[i];
			}
		}
		this.framePos = (this.framePos + this.frameLength) % this.length;
	};

	QuadBuffer.prototype.getBuffer = function(output, length) {
		var len = output.length/4;
		for (var c = 0; c < QUAD; c++) {
			for (var i = 0; i < len; i++) {
				output[c * len + i] = this.buf[this.getPos(c, i - len, this.outPos)];
			}
		}
		this.outPos = (this.outPos + this.stepLength) % this.length;
	};

	return QuadBuffer;
});
