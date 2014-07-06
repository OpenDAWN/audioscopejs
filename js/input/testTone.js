define(function() {
	return function(audio, callback) {
		var osc = audio.createOscillator();
		osc.type = osc.SINE;
		// var freq = audio.sampleRate/735;
		var freq = 27.5;
		osc.frequency.value = freq;
		osc.start();
		var merger = audio.createChannelMerger(2);
		osc.connect(merger, 0, 0);
		osc.connect(merger, 0, 1);
		var i = 0;
		setInterval(function(){
				osc.frequency.value = (1<<(3-i))*freq;
			i = (i+1)%4;
		}, 1000);
		osc.connect(audio.destination);
		callback(merger);
	};
});
