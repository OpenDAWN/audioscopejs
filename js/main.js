requirejs.config({
	paths: {
		'react': "lib/react",
		'three': 'lib/three',
		'fft': "lib/fft"
	},
	shim: {
		'three': {
			'exports': "THREE"
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
