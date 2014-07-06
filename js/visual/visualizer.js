define(['visual/waveform'], function(Waveform) {
	var Visualizer = {
		renderer: null,
		vis: null,
		init: function(canvas) {
			this.renderer = new THREE.WebGLRenderer({
				canvas: canvas,
				antialias: true
			});
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			window.onresize = function() {
				window.requestAnimationFrame(function() {
					this.renderer.setSize(window.innerWidth, window.innerHeight);
				}.bind(this));
			}.bind(this);
		},
		createWaveform: function(maxLength) {
			return new Waveform(this.renderer, maxLength);
		},
		setData: function(data, time) {
			this.vis.setData(data, time);
		},
		setOptions: function(options) {
			this.vis.setOptions(options);
		},
		render: function() {
			this.vis.render();
		}
	};
	return Visualizer;
});