define(['ui/canvas'], function(WebglCanvas) {

	return {
		init: function() {
			WebglCanvas.init();
			var gl = WebglCanvas.getContext();
			var audio = new AudioContext();
			console.log(gl, audio);
		}
	};
});
