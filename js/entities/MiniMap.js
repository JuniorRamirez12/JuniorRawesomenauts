game.MiniMap = me.Entity.extend({   
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
                image: "minimap",
                width: 367,
                height: 157,
                spritewidth: "367",
                spriteheight: "157",
                getShape: function(){
                    return (new me.Rect(0, 0, 699, 114)).toPolygon();
                }
        }]);
    this.floating = true;
    
    }
});
//the code above is what makes the minimap appear on top of the game
