define(['three'], function(THREE) {

	function Waveform(renderer, maxLength) {
		this.renderer = renderer;
		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(0, 1, 1, -1, 0, 1);
		this.camera.position.set(0, 0, 1);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.material = new THREE.LineBasicMaterial({
			color: 0x00ff00
		});

		this.geometry = new THREE.Geometry();
		this.geometry.dynamic = true;
		for (var i = 0; i < maxLength; i++) {
			this.geometry.vertices.push(new THREE.Vector3(i/maxLength, 0, 0));
		}

		this.line = new THREE.Line(this.geometry, this.material);
		this.scene.add(this.line);
	}

	Waveform.prototype = {
		setData: function(data) {
			for (var i = 0; i < this.length; i++) {
				this.geometry.vertices[this.length - i - 1].setY(data[i]);
			}
			this.geometry.verticesNeedUpdate = true;
		},
		setOptions: function(options) {
			if (options.length) {
				this.length = options.length;
				var numVerts = this.geometry.vertices.length;
				for (var i = 0; i < numVerts; i++) {
					this.geometry.vertices[i].setX(i / (this.length-1));
				}
				this.geometry.verticesNeedUpdate = true;
			}
		},
		render: function() {
			this.renderer.render(this.scene, this.camera);
		}
	};

	return Waveform;
});