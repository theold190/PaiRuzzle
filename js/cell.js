var CELL_TYPE_EMPTY = 0;
var CELL_TYPE_COVER = 1;
var CELL_TYPE_FRONT = 2;

Crafty.c("Cell", {
    init: function() {
        this.addComponent("2D, DOM, Color");
        this._index = 0;
    },
    _make: function(x, y, width, height) {
        this.attr({x: x, y: y, w:width, h:height});
        this._update(CELL_TYPE_COVER);
        return this;
    },
    _isInsideCell: function(x, y) {
        return this.contains(x, y, 1, 1);
    },
    _isEmpty: function() {
        return this._type == CELL_TYPE_EMPTY;
    },
    _update: function(type) {
        this._type = type;
        switch(type) {
            case CELL_TYPE_EMPTY:
                this.color("#FF00FF");
                break;
            case CELL_TYPE_COVER:
                this.color("#C1C1C1");
                break;
            case CELL_TYPE_FRONT:
                this.color("#FF0000");
                break;
        }
        if (DEBUG) {
            if (type == CELL_TYPE_EMPTY) {
                if(this.has("Text")) {
                    this.text(" ");
                    this.removeComponent("Text");
                }
            } else {
                if(!this.has("Text")) {
                    this.addComponent("Text");
                    this.css({textAlign: 'center'});
                    this.textFont({size: '10px', family: 'Arial'});
                    this.text(this._index+1);
                }
            }
        }
    },
    _flip: function() {
        switch(this._type) {
            case CELL_TYPE_COVER:
                this._type = CELL_TYPE_FRONT;
                break;
            case CELL_TYPE_FRONT:
                this._type = CELL_TYPE_COVER;
                break;
        }
        this._update(this._type);
    },
    _isSameIndex: function(cell) {
        return this._index == cell._index;
    }
});
