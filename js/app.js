define(['ui/canvas',
	'audio/analyzer'
], function(WebglCanvas, Analyzer) {

	return {
		init: function() {
			var audio = new AudioContext();
			var analyzer = new Analyzer(audio);

			WebglCanvas.init();
			var gl = WebglCanvas.getContext();
		}
	};
});
