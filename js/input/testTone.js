define(function() {
	return function(audio, callback) {
		var osc = audio.createOscillator();
		osc.type = osc.SINE;
		osc.frequency.value = audio.sampleRate/735;
		osc.start();
		var merger = audio.createChannelMerger(2);
		osc.connect(merger, 0, 0);
		osc.connect(merger, 0, 1);
		var i = false;
		setInterval(function(){
			if (i) {
				osc.frequency.value = audio.sampleRate/735;
			} else {
				osc.frequency.value = 2*audio.sampleRate/735;
			}
			i = !i;
		}, 1000);
		// osc.connect(audio.destination);
		callback(merger);
	};
});
