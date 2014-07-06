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
			};
		},
		createWaveform: function() {
			return new Waveform(this.renderer);
		},
		setData: function(data) {
			this.vis.setData(data);
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