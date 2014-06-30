define(['ui/canvas', 'audio/analyzer'], function(WebglCanvas, analyzer) {

	return {
		init: function() {
			WebglCanvas.init();
			var gl = WebglCanvas.getContext();

		}
	};
});
