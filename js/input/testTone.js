define(function() {
	return function(audio, callback) {
		var osc = audio.createOscillator();
		osc.type = osc.SINE;
		// osc.type = osc.SQUARE;
		// osc.type = osc.TRIANGLE;
		// osc.type = osc.SAWTOOTH;
		var freq = audio.sampleRate/32 + 0.1;
		// var freq = 440*3;
		osc.frequency.value = freq;
		osc.start();
		var merger = audio.createChannelMerger(2);
		osc.connect(merger, 0, 0);
		osc.connect(merger, 0, 1);
		// var i = 0;
		// setInterval(function(){
		// 		osc.frequency.value = (1<<(3-i))*freq;
		// 	i = (i+1)%4;
		// }, 1000);
		osc.connect(audio.destination);
		callback(merger);
	};
});
