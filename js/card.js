var CELL_TYPE_EMPTY = 0;
var CELL_TYPE_COVER = 1;
var CELL_TYPE_FRONT = 2;

Crafty.c("Card", {
    init: function() {
        this.addComponent("2D, DOM, Color");
        this._index = 0;
    },
    _make: function(x, y, width, height, skin) {
        this.attr({x: x, y: y, w:width, h:height});
        this._skin = skin;
        this._update(CELL_TYPE_EMPTY);
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
                this.alpha=0.0;
                break;
            case CELL_TYPE_COVER:
                if(this.has(this._frontSprite)) {
                    this.removeComponent(this._frontSprite, false);
                }
                if(!this.has(this._coverSprite)) {
                    this.addComponent(this._coverSprite);
                }
                this.alpha=1.0;
                break;
            case CELL_TYPE_FRONT:
                if(this.has(this._coverSprite)) {
                    this.removeComponent(this._coverSprite, false);
                }
                if(!this.has(this._frontSprite)) {
                    this.addComponent(this._frontSprite);
                }
                this.alpha=1.0;
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
    _setIndex: function(index) {
        this._index = index;
        this._frontSprite = this._skin+"_sprite_front"+index;
        this._coverSprite = this._skin+"_sprite_cover";
        this._update(CELL_TYPE_COVER);
    },
    _isSameIndex: function(cell) {
        return this._index == cell._index;
    }
});
