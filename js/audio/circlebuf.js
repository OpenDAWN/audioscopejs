/**
 * CircleBuf: Circular buffer made of a float array
 */
define(function() {

	/**
	 * bufLength: length of buffer
	 */
	function CircleBuf(bufLength) {
		this.buf = new Float32Array(bufLength);
		this.totalLen = 0;
		this.delay = 0;

	}

	CircleBuf.prototype = {
		get curIndex() {
			return this.totalLen % this.buf.length;
		},
		/**
		 * Puts the input into the buffer, overwriting the oldest values
		 * input: some array with length <= buf.length
		 */
		put: function(input) {
			if (this.curIndex + input.length <= this.buf.length) {
				this.buf.set(input, this.curIndex);
			} else {
				for (var i = 0; i < input.length; i++) {
					this.buf[(this.curIndex + i) % this.buf.length] = input[i];
				}
			}
			this.totalLen += input.length;
		},
		/**
		 * Puts some of the buffer into the output
		 * end is exclusive, end <= total length to keep it causal
		 * output.length < buf.length
		 */
		get: function(output) {
			var start = (this.totalLen - output.length + this.buf.length) % this.buf.length;
			for (var i = 0; i < output.length; i++) {
				output[i] = this.buf[(start + i) % this.buf.length];
			}
		},
		/**
		 * Use in case scriptprocessingnode gets blocked
		 */
		resetDelay: function() {
			this.delay = 0;
		}
	};
	return CircleBuf;
});
