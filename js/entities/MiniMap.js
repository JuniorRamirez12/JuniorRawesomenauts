game.MiniMap = me.ScreenObject.extend({   
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
                image: "minimap",
                width: 699,
                height: 114,
                spritewidth: "699",
                spriteheight: "114",
                getShape: function(){
                    return (new me.Rect(0, 0, 699, 114)).toPolygon();
                }
        }]);
    this.floating = true;
    
    }
});
