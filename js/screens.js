Crafty.c("ScreenText", {
    _textSize: 30,
    _textColor: '#FFFFFF',
    init: function() {
        this.addComponent("2D, DOM, Text");
        this.textColor(this._textColor, 1);
        var size = this._textSize + "px";
        this.textFont({size: size, family: 'Arial'});
        this.css({textAlign: 'center'});
    }
});

Crafty.c("Screen", {
    init: function() {
        this.addComponent("2D, DOM, Color");
        this.attr({w:BOARD_WIDTH, h:BOARD_HEIGHT});
        this.color('#000000');
    },
});

Crafty.c("WelcomeScreen", {
    init: function() {
        this.addComponent("Screen");
        var text = Crafty.e("ScreenText");
        text.text("Welcome to").attr({y:this._h/2-text._textSize, w:this._w});
        var text2 = Crafty.e("ScreenText");
        text2.text("PaiPuzzle game").attr({y:this._h/2, w:this._w});
        var text3 = Crafty.e("ScreenText");
        text3.text("Click to continue").attr({y:this._h-2*text3._textSize, w:this._w});
    }
});

Crafty.c("TaskScreen", {
    init: function() {
        this._time = 60;
        this.addComponent("Screen");
    },
    _setTime: function(time) {
        this._time = time;
        this._update();
    },
    _update: function() {
        this._textRule = Crafty.e("ScreenText");
        this._textRule.text("Click cards to find a pair.").attr({y:this._textRule._textSize, w:this._w});

        var rule = "Saved seconds adds to time limit."
        this._textSave = Crafty.e("ScreenText");
        this._textSave.text(rule).attr({y:this._h/2-this._textRule._textSize, w:this._w});

        var limit = "You have " + this._time + " seconds";
        this._textLimit = Crafty.e("ScreenText");
        this._textLimit.text(limit).attr({y:this._h-2*this._textLimit._textSize, w:this._w});
    }
});

Crafty.c("GameOverScreen", {
    init: function() {
        this.addComponent("Screen");
    },
    _setStatus: function(timeIsUp, time) {
        if(timeIsUp) {
            var text = Crafty.e("ScreenText");
            text.text("Time is up.").attr({y:this._h/3-text._textSize, w:this._w});
            var text = Crafty.e("ScreenText");
            text.text("Game is over.").attr({y:this._h/2, w:this._w});
        } else {
            var text = Crafty.e("ScreenText");
            text.text("Your score is " + time + ".").attr({y:this._h/3-text._textSize, w:this._w});
            var text = Crafty.e("ScreenText");
            text.text("Game is completed!").attr({y:this._h/2, w:this._w});
        }
    }
});
