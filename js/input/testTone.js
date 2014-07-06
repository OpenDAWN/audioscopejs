define(function() {
	return function(audio, callback) {
		var osc = audio.createOscillator();
		osc.type = osc.SINE;
		osc.frequency.value = audio.sampleRate / 64;
		osc.start();
		var merger = audio.createChannelMerger(2);
		osc.connect(merger, 0, 0);
		osc.connect(merger, 0, 1);
		callback(merger);
	};
});
