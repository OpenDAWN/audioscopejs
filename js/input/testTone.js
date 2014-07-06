define(function() {
	return function(audio, callback) {
		var osc = audio.createOscillator();
		osc.type = osc.TRIANGLE;
		osc.frequency.value = 0.5;
		osc.start();
		var merger = audio.createChannelMerger(2);
		osc.connect(merger, 0, 0);
		osc.connect(merger, 0, 1);
		callback(merger);
	};
});
