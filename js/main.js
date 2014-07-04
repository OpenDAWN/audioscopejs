requirejs.config({
	paths: {
		'react': "lib/react",
		'realfft': "lib/real",
		'complexfft': "lib/complex"
	},
	shim: {
		'realfft': {
			'exports': "FFT"
		},
		'complexfft': {
			'exports': "FFT"
		}
	}
});

require(['app'], function(App) {
	// polyfills
	navigator.getUserMedia = (navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);
	App.init();
});
