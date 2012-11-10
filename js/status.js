Crafty.c("Status", {
    init: function() {
        this.addComponent("2D, DOM, Text");
        this.css({textAlign: 'center'});
        this.textFont({size: '10px', family: 'Arial'});
    },
    _make: function(x, y) {
        this.attr({x:x, y:y});
        return this;
    },
    _setTime: function(time) {
        var minutes = parseInt(time / 60);
        var seconds = time - minutes * 60;
        if (seconds < 10) seconds = "0" + seconds;
        var t = minutes == 0 ? ":" + seconds : minutes + ":" + seconds;
        this.text(t);
    },
    _timePunishment: function() {
        this.textColor("#FF0000", 1);
        setTimeout(this._cancelTimePunishment, 1000);
    },
    _cancelTimePunishment: function() {
        var status = Crafty("Status");
        status.textColor("#000000", 1);
    }
});