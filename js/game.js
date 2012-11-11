var DEBUG=0;
var SKIN="ComHazzle";
var DEFAULT_GAME_TIME=60;
var NUMBER_OF_ROUNDS = 1;
var blockInput = false;

Crafty.c("Game", {
    init: function() {
        this.addComponent("KeyboardEvent, 2D, DOM, Mouse");
        this.attr({x:0, y:0, w:BOARD_WIDTH, h:BOARD_HEIGHT});

        this._status = Crafty.e("Status")._make(BOARD_WIDTH+20, 0);
        this.bind('KeyDown', function(e) {
            if(e.key == Crafty.keys['SPACE']
                || e.key == Crafty.keys['ENTER']) {
                if (this._isWelcomeScreen()) {
                    this._preStartRound();
                    return;
                }
                if (this._isTaskScreen()) {
                    this._startRound();
                    return;
                }
                if (this._isGameOverScreen()) {
                    this._start();
                    return;
                }
            }
        });

        this.bind('Click', function(e) {
            if (blockInput) {
                return;
            }
            if (this._isWelcomeScreen()) {
                this._preStartRound();
                return;
            }
            if (this._isTaskScreen()) {
                this._startRound();
                return;
            }
            if (this._isGameOverScreen()) {
                this._start();
                return;
            }
            if (this._isRoundOver()) {
                if(this._roundNumber < NUMBER_OF_ROUNDS) {
                    this._preStartRound();
                } else {
                    this._gameOver(false);
                }
                return;
            }
            var cell = this._board._getCellByCoords(e.realX, e.realY);
            if (cell == undefined || cell._isEmpty()) {
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
    _isScreenDisplayed: function(screen) {
        var screens = Crafty(screen);
        if (screens.length > 0) {
            return true;
        }
        return false;
    },
    _isWelcomeScreen: function() {
        return this._isScreenDisplayed('WelcomeScreen');
    },
    _isGameOverScreen: function() {
        return this._isScreenDisplayed('GameOverScreen');
    },
    _isTaskScreen: function() {
        return this._isScreenDisplayed('TaskScreen');
    },
    _start: function() {
        this._roundNumber = 0;
        this._countdown = 0;
        Crafty.e("WelcomeScreen");
    },
    _preStartRound: function() {
        this._roundNumber++;
        this._clearAll();
        this._countdown += DEFAULT_GAME_TIME;
        blockInput = false;
        Crafty.e("TaskScreen")._setTime(this._countdown);
    },
    _startRound: function() {
        this._clearAll();
        this._board = Crafty.e("Board")._make(this._w, this._h, SKIN);
        this._board._randomize();

        this._status._setTime(this._countdown < 0 ? 0 : this._countdown);
        setTimeout(this._doCountdown, 1000);
    },
    _doCountdown: function() {
        var game = Crafty("Game");
        game._countdown--;
        game._status._setTime(game._countdown < 0 ? 0 : game._countdown);
        if (game._isGameOver()) {
            game._gameOver(true);
        } else if (game._isRoundOver()) {
        } else {
            setTimeout(game._doCountdown, 1000);
        }
    },
    _gameOver: function(gameLost) {
        var game = Crafty("Game");
        Crafty.e("GameOverScreen")._setStatus(gameLost, game._countdown);
    },
    _isGameOver: function() {
        return this._countdown < 0;
    },
    _isRoundOver: function() {
        var board = Crafty("Board");
        var empty = board._getCellsByType(CELL_TYPE_EMPTY);
        return empty.length == board._getNumOfCells();
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
    },
    _clearAll: function() {
        var game = Crafty("Game");
        var elements = Crafty('Card, Board, Screen, ScreenText');
        for (var i=0; i<elements.length; i++) {
            if (elements[i] != game) {
                Crafty(elements[i]).destroy();
            }
        }
    }
});
