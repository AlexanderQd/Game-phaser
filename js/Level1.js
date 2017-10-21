

Game.Level1 = function(game){};


let map;
let layer;
let player;
let controls = {};
const playerSpeed = 250;
let button;
let demon;
const demonSpeed = 100;

Game.Level1.prototype = {
    create:function()
    {
        /*
            add gravity
        */
        this.physics.arcade.gravity.y = 1400;
        /*
            background
        */
        this.add.tileSprite(0,0,2560,600,'background');       
        /*
            add the tilemap, with the scale of cubes
        */
        map = this.add.tilemap('map',64,64);
        map.addTilesetImage('tileset');
        /*
            created the layer
        */
        layer = map.createLayer(0);    
        layer.resizeWorld();       
        /*
            collitions with cubes of component the map
        */
        map.setCollisionBetween(0,19);
        /*
            add player in position x y 
        */       
        player = new Player(100,450,this.game);        
        /*
            add demon in position x y
        */
        demon = new Demon(600,100,this.game); 
        /*
            add the controls
        */
        controls = {
           right: this.input.keyboard.addKey(Phaser.Keyboard.A),
           left: this.input.keyboard.addKey(Phaser.Keyboard.D),
           up: this.input.keyboard.addKey(Phaser.Keyboard.W)
       };
        button = this.add.button(0,0, 'buttons', function(){
            console.log("pulsado");
       });
        button.fixedToCamera = true;
      
       
        
    },
    update:function(){
        
        /*
            colitions between the player and the world
        */
        this.physics.arcade.collide(player.player,layer);        
        this.physics.arcade.collide(demon.demon,layer);       
        /*
            animation of the player
        */
        if(controls.right.isDown)
        { 
            player.right();       
        }
        if(controls.left.isDown)
        {
            player.left();        
        }
        if(!controls.left.isDown && !controls.right.isDown)
        {
            player.stop();            
        }
        if(controls.up.isDown &&(player.player.body.onFloor() || player.player.body.touching.down && this.time.now > jumpTimer) )
        {
            player.up();            
        }
        
        /*
            animations of the demon
        */
        if(demon.demon.position.x >= 600)
        {
           demon.right();
        }
        if(demon.demon.position.x < 300)
        {
           demon.left();
        }
        
    },
}