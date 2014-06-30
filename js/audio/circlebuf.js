/**
 * CircleBuf: Circular buffer made of float arrays
 */
define(function() {

	/**
	 * bufLength: length of each buffer
	 * numBuf: Number of buffers
	 */
	function CircleBuf(bufLength, numBuf) {
		this.bufs = [];
		this.bufLength = bufLength;
		this.length = bufLength * numBuf;
		this.numBuf = numBuf;
		this.curBufIndex = 0;
		for (var i = 0; i < numBuf; i++) {
			this.bufs.push(new Float32Array(bufLength));
		}
	}

	CircleBuf.prototype = {
		get curBuf() {
			return this.bufs[this.curBufIndex];
		},
		/**
		 * overwrites the last buffer with new input
		 * input: some array with length == bufLength
		 */
		put: function(input) {
			this.curBuf.set(input);
			this.curBufIndex = (this.curBufIndex + 1) % this.numBuf;
		},
		/**
		 * Retrieves everything from the current buffer and previous buffers
		 * bufLength <= output.length <= numBuf*bufLength
		 */
		get: function(output, offset) {
			var i;
			var startBufIndex = offset / this.bufLength,
				startOffset = offset % this.bufLength,
				startLength = this.bufLength - startOffset;
			var endBufIndex = (offset + length) / this.bufLength,
				endOffset = (startOffset + output.length) / this.bufLength - startOffset,
				endLength = this.length - endOffset;
			offset = offset % this.bufLength;
			for (i = 0; i < startLength; i++) {
				output[i] = this.bufs[startBufIndex][i + startOffset];
			}
			for (i = 0; i < endLength; i++) {
				output[i + endOffset] = this.bufs[endBufIndex][i];
			}
			for (var b = startBufIndex; b !== endBufIndex; b = (b + 1) % this.numBuf) {
				output.set(this.bufs[b], startOffset + ((b - startBufIndex) % this.numBuf) * this.bufLength);
			}
			/* i should probably do it the simpler way */
		}
	};
	return CircleBuf;
});
