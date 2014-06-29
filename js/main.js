requirejs.config({
	paths: {
		'react': "lib/react",
		'realfft': "lib/real",
		'complexfft': "lib/complex"
	},
	shim: {
		'react': {
			'exports': "React"
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

	if (!AudioContext) {
		alert("Your browser does not support Web Audio.");
	}
	App.init();
});
