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

	if (!AudioContext) {
		alert("Your browser does not support Web Audio.");
	}
	App.init();
});
