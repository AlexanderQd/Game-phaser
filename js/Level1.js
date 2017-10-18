

Game.Level1 = function(game){};


let map;
let layer;
let player;
let controls = {};
const playerSpeed = 250;
let jumpTimer =0;
let button;
let demon;
const demonSpeed = 100;
let bola;
Game.Level1.prototype = {
    create:function()
    {
        //agrregando agrevedad
        this.physics.arcade.gravity.y = 1400;
        //fondo
        this.add.tileSprite(0,0,2560,600,'background');
        //mapeado map key 64,64 tamaño de cada celda
        map = this.add.tilemap('map',64,64);
        map.addTilesetImage('tileset');
        //creando el layer
        layer = map.createLayer(0);    
        layer.resizeWorld();
        //colisiones con los cubos que componen el mapa
        map.setCollisionBetween(0,19);
        //agregando personaje posicion x y 
        player = this.add.sprite(100,450,'player');
        player.anchor.setTo(0.5,0.5);
        //animaciones de personaje key de la animacion, las imagenes que corresponden, la velocidad de fotogramas
        player.animations.add('rigth',[5,8],5,true);
        player.animations.add('left',[0,4],5,true);      
        //agregando fisicas al personaje
        this.physics.arcade.enable(player);
        
        //camara sigue al personaje
        this.camera.follow(player);
        //colisiones con el fin del mapa
        player.body.collideWorldBounds = true;
        //agregando demonioo       
        demon  = this.add.sprite(600, 100,'demon');
        demon.anchor.setTo(0.5,0.5);
        demon.scale.setTo(2,2);
        demon.animations.add('left', [8,11],5, true);
        demon.animations.add('rigth',[12,15],5,true);
        this.physics.arcade.enable(demon);
        demon.body.collideWorldBounds = true;
        
        //agregando valores a los controles
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
        //colisiones entre personaje y el mapa
        this.physics.arcade.collide(player,layer);
        this.physics.arcade.collide(demon,layer);       
       //movimiento y animaciones
        if(controls.right.isDown)
        { 
            player.animations.play('left');
            player.scale.setTo(1,1);
            player.body.velocity.x = -playerSpeed;
        }
        if(controls.left.isDown)
        {
            player.animations.play('rigth');
            player.scale.setTo(1,1);
            player.body.velocity.x = playerSpeed;
        }
        if(!controls.left.isDown && !controls.right.isDown)
        {
            player.animations.stop(null,true);
            player.body.velocity.x = 0;
        }
        if(controls.up.isDown &&(player.body.onFloor() || player.body.touching.down && this.time.now > jumpTimer) )
        {
            player.body.velocity.y = -600;
            jumpTimer = this.time.now + 750;
        }
        
       
        if(demon.position.x >= 600)
        {
            demon.animations.play('rigth');
            demon.body.velocity.x = -demonSpeed;
        }
        if(demon.position.x < 300)
        {
            demon.animations.play('left');
            demon.body.velocity.x = demonSpeed;
        }
        
    },
}