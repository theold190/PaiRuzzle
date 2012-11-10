var DEBUG=0;
var SKIN="ComHazzle";
var DEFAULT_GAME_TIME=180;
var blockInput = false;

Crafty.c("Game", {
    init: function() {
        this.addComponent("KeyboardEvent, 2D, Mouse");
        this._board = Crafty.e("Board")._make(100, 100, SKIN);
        this._board._randomize();
        this.attr({x:this._x, y:this._y, w:this._board._w, h:this._board._h});
        blockInput = false;

        this._status = Crafty.e("Status")._make(120, 0);

        this._countdown = DEFAULT_GAME_TIME;
        setTimeout(this._doCountdown, 1000);

        this.bind('Click', function(e) {
            if (blockInput) {
                return;
            }
            var cell = this._board._getCellByCoords(e.realX, e.realY);
            if (cell._isEmpty()) {
                return;
            }
            cell._flip();
            var flipped = this._board._getCellsByType(CELL_TYPE_FRONT);
            if (flipped.length == 2) {
                blockInput = true;
                setTimeout(this._checkFlipped, 300);
            }
        });
    },
    _doCountdown: function() {
        var game = Crafty("Game");
        game._countdown--;
        game._status._setTime(game._countdown < 0 ? 0 : game._countdown);
        if (game._countdown < 0) {
            game._gameOver();
        } else {
            setTimeout(game._doCountdown, 1000);
        }
    },
    _gameOver: function() {
        //alert("Game is over...");
    },
    _checkFlipped: function() {
        var game = Crafty("Game");
        var board = Crafty("Board");
        var flipped = board._getCellsByType(CELL_TYPE_FRONT);
        if (flipped.length == 2) {
            if (flipped[0]._isSameIndex(flipped[1])) {
                flipped[0]._update(CELL_TYPE_EMPTY);
                flipped[1]._update(CELL_TYPE_EMPTY);
            } else {
                flipped[0]._flip();
                flipped[1]._flip();
                game._countdown-=5;
                game._status._timePunishment();
            }
        }
        var empty = board._getCellsByType(CELL_TYPE_EMPTY);
        if (empty.length == board._getNumOfCells()) {
            board._setFinalImage();
        }
        blockInput = false;
    }
});
