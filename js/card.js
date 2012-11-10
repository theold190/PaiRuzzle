var CELL_TYPE_EMPTY = 0;
var CELL_TYPE_COVER = 1;
var CELL_TYPE_FRONT = 2;

function getColorByIndex(index)
{
    switch(index) {
        case 0: return "#B2DB11";
        case 1: return "#FFFF00";
        case 2: return "#FF0000";
        case 3: return "#00A0C6";
        case 4: return "#66B821";
        case 5: return "#FFB200";
        case 6: return "#F0027F";
        case 7: return "#0A50A1";
        case 8: return "#008837";
        case 9: return "#FF6600";
        case 10: return "#81017E";
        case 11: return "#13007C";
    }
}

Crafty.c("Card", {
    init: function() {
        this.addComponent("2D, DOM, Color");
        this._index = 0;
    },
    _make: function(x, y, width, height) {
        this.attr({x: x, y: y, w:width, h:height});
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
                this.color("#FF00FF");
                this.alpha=0.0;
                break;
            case CELL_TYPE_COVER:
                this.color("#C1C1C1");
                this.alpha=1.0;
                break;
            case CELL_TYPE_FRONT:
                this.color(getColorByIndex(this._index));
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
        this._update(CELL_TYPE_COVER);
    },
    _isSameIndex: function(cell) {
        return this._index == cell._index;
    }
});
