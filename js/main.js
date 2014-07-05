requirejs.config({
	paths: {
		'react': "lib/react",
		'three': 'lib/three',
		'realfft': "lib/real",
		'complexfft': "lib/complex"
	},
	shim: {
		'three': {
			'exports': "THREE"
		},
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
