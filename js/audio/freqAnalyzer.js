define(['fft', 'audio/windows'], function(FFT, w) {
    function FreqAnalyzer(analyzer) {
        this.analyzer = analyzer;
    }
    FreqAnalyzer.prototype = {
        setLength: function(n) {
            this.fft = new FFT.complex(n, false);
            console.log(this.fft);
            this.window = new w.BlackmanHarris(n);
            this.buf1 = new Float32Array(2*n);
            this.buf2 = new Float32Array(2*n);
        },
        // todo: put in more inputs and compute mag/phase
        getFreqDomain: function(channelFn, out1, out2) {
            channelFn.call(this.analyzer, this.buf1, this.buf2, 0);
            // this.window.doWindow(this.buf1, this.buf1);
            // this.window.doWindow(this.buf2, this.buf2);
            // outputs have length 2*n
            this.fft.simple(out1, this.buf1, 'real');
            this.fft.simple(out2, this.buf2, 'real');
        }
    };
    return FreqAnalyzer;
});