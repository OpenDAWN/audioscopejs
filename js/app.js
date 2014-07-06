define(['ui/canvas',
	'audio/analyzer',
	'input/Mic',
	'input/testTone',
	'visual/visualizer'
], function(WebglCanvas, Analyzer, Mic, Tone, Visualizer) {
	var debugLength = 64;
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
				Visualizer.setData(debugArray.L);
				Visualizer.render();
				requestAnimationFrame(mainLoop);
			}
			mainLoop();

		}
	};
});
