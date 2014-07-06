/**
 * Cosine windows
 */
define(function() {
	function Window(name, a, length) {
		var fn = makeWindowFn(a);
		var w = new Float32Array(length);
		for (var n = 0; n < length; n++) {
			w[n] = fn(n, length);
		}
		this.name = name;
		this.fn = w;
	}

	Window.prototype.doWindow = function doWindow(output, input) {
		for (var n = 0; n < input.length; n++) {
			output[n] = input[n] * this.fn[n];
		}
	};

	function makeWindowFn(coeffs) {
		return function windowFn(n, N) {
			return coeffs.map(function(a, k) {
				return a * Math.cos(2 * Math.PI * k * n / (N - 1));
			}).reduce(function(x, y) {
				return x + y;
			});
		};
	}

	function makeWindow(name, a) {
		return Window.bind(null, name, a);
	}

	var Windows = {
		Rect: makeWindow('rect', [1]),
		Hamming: makeWindow('hamming', [25/46, -21/46]),
		Blackman: makeWindow('blackman', [7938/18608, -9240/18608, 1430/18608]),
		BlackmanHarris: makeWindow('blackmanharris', [0.35875, -0.48829, 0.14128, -0.01168])
	};
	return Windows;
});
