/** @jsx React.DOM */
define(['react'], function(React) {
	var canvas;
	// https://developer.mozilla.org/en-US/docs/Web/WebGL/Getting_started_with_WebGL
	function initWebGL(cvs) {
		gl = null;
		try {
			gl = cvs.getContext("webgl") || cvs.getContext("experimental-webgl");
		} catch (e) {}
		if (!gl) {
			alert("Unable to initialize WebGL. Your browser may not support it.");
			gl = null;
		}
		return gl;
	}

	var WebglCanvas = React.createComponent({
		componentDidMount: function() {
			canvas = this.refs.canvas.getDOMNode();
		},
		render: function() {
			return React.DOM.canvas( {ref:"canvas"});
		}
	});

	return {
		init: function() {
			React.renderComponent(WebglCanvas(null), document.body);
		},
		getContext: function () {
			return initWebGL(canvas);
		}
	};
});
