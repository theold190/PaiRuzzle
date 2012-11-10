Crafty.c("Board", {
    init: function() {
        this.addComponent("2D, DOM, Image");
        this._rows = 4;
        this._cols = 4;
    },
    _make: function(width, height, skin) {
        this._skin = skin;
        this.attr({w:width, h:height});

        var cellWidth = parseInt(width / this._cols);
        var cellHeight = parseInt(height / this._rows);

        this._board = [];
        var cy = 0;
        for (var i=0; i<this._rows; i++) {
            this._board[i] = [];
            var cx = 0;
            for (var j=0; j<this._cols; j++) {
                this._board[i][j] = Crafty.e("Card")._make(cx, cy, cellWidth, cellHeight, this._skin);
                cx += cellWidth;
            }
            cy += cellHeight;
        }
        this.image("img/"+skin+"/background.png");
        return this;
    },
    _randomize: function() {
        var numElements = this._rows * this._cols;
        var num = parseInt(numElements/2);

        for (var n=0; n<2*num; ++n) {
            var index = Crafty.math.randomInt(0,numElements-1);
            var found = false;
            while(!found) {
                for (var i=0; i<this._rows && !found; ++i) {
                    for (var j=0; j<this._cols && !found; ++j) {
                        if(this._board[i][j]._isEmpty()) {
                            if (index <= 0) {
                                this._board[i][j]._setIndex(n%num);
                                found = true;
                                break;
                            }
                            index--;
                        }
                    }
                }
            }
            numElements--;
        }
    },
    _getCellByCoords: function(x, y) {
        for (var i=0; i<this._rows; i++) {
            for (var j=0; j<this._cols; j++) {
                if(this._board[i][j]._isInsideCell(x,y)) {
                    return this._board[i][j];
                }
            }
        }
    },
    _getCellsByType: function(type) {
        var list = [];
        for (var i=0; i<this._rows; i++) {
            for (var j=0; j<this._cols; j++) {
                if(this._board[i][j]._type == type) {
                    list[list.length] = this._board[i][j];
                }
            }
        }
        return list;
    }
});
