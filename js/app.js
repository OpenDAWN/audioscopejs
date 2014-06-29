define([], function() {

	// https://developer.mozilla.org/en-US/docs/Web/WebGL/Getting_started_with_WebGL
	function initWebGL(canvas) {
		gl = null;
		try {
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		} catch (e) {}
		if (!gl) {
			alert("Unable to initialize WebGL. Your browser may not support it.");
			gl = null;
		}
		return gl;
	}

	return {
		init: function() {
			var canvas = document.querySelector("canvas");
			var gl = initWebGL(canvas);
			var audio = new AudioContext();
			console.log(canvas, gl, audio);
		}
	};
});
