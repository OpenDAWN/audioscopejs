define(function() {
    function TimeAnalyzer(analyzer, stepSize) {
        this.analyzer = analyzer;
        this.trigger = {
            period: stepSize,
            offset: 0
        };
    }
    TimeAnalyzer.prototype = {
        get offset() {
            var period = this.trigger.period;
            return (period + (this.time % period) - this.trigger.offset) % period;
        },
        get time() {
            return this.analyzer.buffer.time;
        },
        /**
         *  Sets the interval
         */
        setTrigger: function(trigger) {
            this.trigger.period = trigger.period || this.trigger.period;
            this.trigger.offset = trigger.offset % this.trigger.period || this.trigger.offset;
        },
        /**
         * Mono functions take one of the ChannelFn from above
         */
        getTimeDomain: function(channelFn, out1, out2) {
            channelFn.call(this.analyzer, out1, out2, this.offset);
        }
    };
    return TimeAnalyzer;
});