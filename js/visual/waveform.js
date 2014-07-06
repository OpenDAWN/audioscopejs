define(['three'], function(THREE) {

	function Waveform(renderer) {
		this.renderer = renderer;
		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(-1, 1, -1, 1, 0, 1);
		this.camera.position.set(0, 0, 1);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.material = new THREE.LineBasicMaterial({
			color: 0x00ff00
		});

		this.geometry = new THREE.Geometry();
		this.geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
		this.geometry.vertices.push(new THREE.Vector3(0, 1, 0));
		this.geometry.vertices.push(new THREE.Vector3(1, 0, 0));
		this.geometry.dynamic = true;

		this.line = new THREE.Line(this.geometry, this.material);
		this.scene.add(this.line);

		this.i = 0;
	}

	Waveform.prototype = {
		setData: function(data) {},
		setOptions: function(options) {},
		render: function() {
			this.geometry.vertices[1].setY(1 * Math.sin(this.i / 20));
			this.i++;
			this.geometry.verticesNeedUpdate = true;
			this.renderer.render(this.scene, this.camera);
		}
	};

	return Waveform;
});