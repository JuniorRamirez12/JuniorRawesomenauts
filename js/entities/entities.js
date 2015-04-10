game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64", 
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }


            }]);
        this.body.setVelocity(5, 20);
        this.facing = "right";
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta){
         this.now = new Date().getTime();
        if (me.input.isKeyPressed("right")) {
           
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
        } else if (me.input.isKeyPressed("left")) {
            this.facing = "left";
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(false);
        }
        else {
            this.body.vel.x = 0;
        }
        if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
            this.body.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }

        if (me.input.isKeyPressed("attack")) {
            console.log("attack");
            if (!this.renderable.isCurrentAnimation("attack")) {
                console.log("attack");
                
                this.renderable.setCurrentAnimation("attack", "idle");
                
                this.renderable.setAnimationFrame();
            }
        }

        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if(!this.renderable.isCurrentAnimation("attack")){
            this.renderable.setCurrentAnimation("idle");
        }
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;

            console.log("xdif" + xdif + " ydif " + ydif);

            if(ydif<-40 && xdif< 70 && xdif>-35){
                this.body.falling = false;
                this.body.vel.y = -1;
            }
             else if(xdif>-35 && this.facing==='right' && (xdif<0)){
                this.body.vel.x = 0;
            }else if(xdif<60 && this.facing==='left' && xdif>0){
                this.body.vel.x = 0;
            }
            
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
                console.log("tower Hit");
                  this.lastHit = this.now;
                  response.b.loseHealth();
            }
        }
    }
            
});
game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spritehieght: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 69)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        this.type = "PlayerBase";

        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");


    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    onCollision: function() {

    }
});

game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spritehieght: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 69)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 2;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        this.type = "EnemyBaseEntity";

        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");


    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");

        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    },
    
    loseHealth: function(){
        this.health--;
    }
});

game.EnemyCreep = me.Entity.extend({
        init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64", 
                getShape: function() {
                    return(new me.Rect(0, 0, 32, 64)).toPolygon();
                }


            }]);
        this.health =10;
        this.alwaysUpdate = true;
        this.attacking = false;
        this.lastAttacking = new Date().getTime();
        this.lastHit = new Date().getTime();
        this.body.setVelocity(3, 20);
        this.now = new Date().getTime();
        this.type = "EnemyCreep";                       
        this.renderable.addAnimation("walk",[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 80);
        this.renderable.setCurrentAnimation("walk");
    },
    update: function(delta){
        this.now = new Date().getTime();
        
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    
    collideHandler: function(response){
        if(response.b.type==='PlayerBase'){
            this.attacking=true;
            //this.lastAttacking=this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now-this.lastHit >= 1000)) {
                this.lastHit = this.now;
                response.b.loseHealth(1);
            }
            
        }
    }
    
}); 
game.GameManager = Object.extend({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        
        this.alwaysUpdate = true;
    },
    update: function(){
        this.now = new Date().getTime();
        
        if(Math.round(this.now/5)%10 ===0 &&(this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 2000, 700, {});
            me.game.world.addChild(creepe, 5);
            
        }
        return true;
    }
});