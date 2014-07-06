define(['ui/canvas',
	'audio/analyzer',
	'input/Mic',
	'input/testTone',
	'visual/visualizer'
], function(WebglCanvas, Analyzer, Mic, Tone, Visualizer) {
	var FPS = 1;
	var debugLength = 20000;
	var debugArray = {
		L: new Float32Array(debugLength),
		R: new Float32Array(debugLength)
	};
	function debugScope(a) {
		a.getTimeDomain(a.getLR, debugArray.L, debugArray.R);
		console.log(debugArray.L, debugArray.R);
		setTimeout(debugScope, 1000/FPS, a);
	}
	

	return {
		init: function() {
			var audio = new AudioContext();
			var analyzer = new Analyzer(audio);
			analyzer.setDelay(0);

			Tone(audio, function(input){
				analyzer.setInput(input);
				// debugScope(analyzer);
			});

			WebglCanvas.init();
			var canvas = document.querySelector("canvas");
			Visualizer.init(canvas);
			Visualizer.vis = Visualizer.createWaveform(debugLength);

			function mainLoop() {
				analyzer.getTimeDomain(analyzer.getLR, debugArray.L, debugArray.R);
				for (var i = 1; i < debugLength; i++) {
					if (Math.abs(debugArray.L[i] - debugArray.L[i-1]) > 3 / 44100) {
						console.log("skip");
					}
					// if (debugArray.L[i] === 0) console.log("zero");
				}
				Visualizer.setData(debugArray.L);
				Visualizer.render();
				requestAnimationFrame(mainLoop);
			}
			mainLoop();

		}
	};
});
