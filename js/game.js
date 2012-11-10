var DEBUG=0;

Crafty.c("Game", {
    init: function() {
        this.addComponent("KeyboardEvent, 2D, Mouse");
        this._board = Crafty.e("Board")._make(100, 100);
        this.attr({x:this._x, y:this._y, w:this._board._w, h:this._board._h});

        this.bind('Click', function(e) {
            var cell = this._board._getCellByCoords(e.realX, e.realY);
            if (cell._isEmpty()) {
                return;
            }
            cell._flip();
            var flipped = this._board._getCellsByType(CELL_TYPE_FRONT);
            if (flipped.length == 2) {
                if (flipped[0]._isSameIndex(flipped[1])) {
                    flipped[0]._update(CELL_TYPE_EMPTY);
                    flipped[1]._update(CELL_TYPE_EMPTY);
                } else {
                    flipped[0]._flip();
                    flipped[1]._flip();
                }
            }
        });
    }
});
