Crafty.c("Board", {
    init: function() {
        this.addComponent("2D, DOM");
        this._rows = 4;
        this._cols = 4
    },
    _make: function(width, height) {
        this.attr({w:width, h:height});

        var cellWidth = parseInt(width / this._cols);
        var cellHeight = parseInt(height / this._rows);

        this._board = [];
        var cy = 0;
        for (var i=0; i<this._rows; i++) {
            this._board[i] = [];
            var cx = 0;
            for (var j=0; j<this._cols; j++) {
                this._board[i][j] = Crafty.e("Cell")._make(cx, cy, cellWidth, cellHeight);
                cx += cellWidth;
            }
            cy += cellHeight;
        }

        return this;
    },
    _getBoardSize: function() {
        return this._board.length;
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
