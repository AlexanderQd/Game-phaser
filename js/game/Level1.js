

Game.Level1 = function(game){};

//map
let map;
let layer;

//player
let player;
let controls = {};
let healthbar;

//enemie
let demons = [];
let demonsfly = [];
let count;
//shoot
let bullets;
let fireRate = 500;
let nextFire = 0;
//game interface
let points = 0;
let scoreString = '';
let scoreText;
Game.Level1.prototype = {
    create:function()
    {
        count = 0;
        /*
            background
        */
        this.add.tileSprite(0,0,6400,3500,'backgroundLevel1');       
        /*
            add the tilemap, with the scale of cubes
        */
        map = this.add.tilemap('map',64,64);        
        map.addTilesetImage('tilemappaterns');
        
        /*
            created the layer
        */
        layer = map.createLayer(0);    
        layer.resizeWorld();       
        /*
            collitions with cubes of component the map
        */
        map.setCollisionBetween(23,24);
        map.setCollisionBetween(32,34);
        map.setCollision(0);
        //audio======================================================
        let music = this.add.audio('epic');
        music.play('', 0, 1, true);
        music.onLoop.add(this.playLevelMusic, music);
        //=====================================================
        healthbar = this.add.sprite(350, 0,'healthbar');
        healthbar.fixedToCamera = true;
        healthbar.width = 100;
        /*
            add player in position x y 
        */  
        player = new Player(0,3000,this.game,Phaser);
        this.camera.follow(player.player);
        player.player.body.collideWorldBounds = true;
        player.player.body.gravity.y = 1400;
        player.player.animations.play('right', 5, true);
        //add bullets
        bullets = this.add.group();
        bullets.enableBody = true;
        bullets.enableBodyType = Phaser.Physics.ARCADE;        

        bullets.createMultiple(100, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
        /*
            add demons in position x y
        */
       /* for(let i = 0; i < 2; i++)
        {
            demons[i] = new Demon(600,100,this.game,Phaser);
            demons[i] = new Demon(1200,100,this.game,Phaser);
            
        }*/
        demons[0] = new Demon(600, 100, this.game, Phaser);
        demonsfly[0]  = new DemonFly(1300, 2800, this.game, Phaser);      
        /*
            add the controls
        */
        controls = {
           right: this.input.keyboard.addKey(Phaser.Keyboard.D),
           left: this.input.keyboard.addKey(Phaser.Keyboard.A),
           up: this.input.keyboard.addKey(Phaser.Keyboard.W),
           menu: this.input.keyboard.addKey(Phaser.Keyboard.ESC)
       };      
        //score
        scoreString = 'Score: ';
        scoreText = this.add.text(10,50, scoreString + points, { font: '34px Arial', fill: '#fff'});
        scoreText.fixedToCamera = true;
        map.setTileIndexCallback(0, collisionMagmaHandler, player, layer);   
    },
    update:function(){
       
        /*
            colitions between the player and the world
        */
        
        this.physics.arcade.collide(player.player,layer);        
        this.physics.arcade.collide(demons[0].demon,layer);
        
        
       // this.physics.arcade.collide(demons[1].demon,layer);
        demonsfly[0].demonfly.animations.play('fly', 5, true);
        /*
            animation of the player
        */
        if(controls.right.isDown && player.player.frame < 10)
        { 
           player.right();       
        }
        if(controls.left.isDown && player.player.frame < 10)
        {
            player.left();        
        }
             
        if(!controls.left.isDown && !controls.right.isDown)
        {
            
            if(player.player.health <= 0){
                
            }else{                
                player.stop(); 
            }
                           
        }
        if(controls.up.isDown &&  player.player.frame < 10 && (player.player.body.onFloor() || player.player.body.touching.down && this.time.now > jumpTimer ) )
        {
            player.up();            
        }
                
        /*
            animations of the demons
        */       
        demons[0].patrol();
        demonsfly[0].fly();
        //shooting
        if(this.input.activePointer.isDown)
        {   let time = this.time.now;
            fire(this.game,player.player,bullets);            
        }
       
        this.physics.arcade.overlap(bullets, demons[0].demon, collisionHandler, null, this);        
        this.physics.arcade.overlap(bullets, demonsfly[0].demonfly, collisionHandler, null, this);
        this.physics.arcade.collide(bullets, layer, collisionHandlerLayer, null, this);
        if(count >= demons.length -1)
        {
            count = 0;
        }else{
            count ++;
        }
        
       if(controls.menu.isDown)
       {           
           this.menuState();
       }
        
    },
    playLevelMusic: function(){
         this.play('', 0, 1, true);
    },
    menuState: function()
    {
        this.game.state.start('MainMenu');
    },
}
function fire(game,player,bullets){   
    
    if(game.time.now > nextFire && bullets.countDead() > 0)
    {
        
        nextFire = game.time.now + fireRate;
        let bullet = bullets.getFirstDead();        
        
        bullet.animations.add('left',[0],5,true);
        bullet.animations.add('right',[1],5,true);
        player.shotsound.play();
        if(player.animations.name ==='left')
        {  
            bullet.reset(player.x - 75 , player.y - 15);
            bullet.animations.play('left');
            bullet.body.velocity.x = - 400;
            
        }else{
            bullet.reset(player.x + 20 , player.y -15);
            bullet.animations.play('right');
            bullet.body.velocity.x = 400; 
        }
    }
}
function collisionHandler(enemie, bullet)
{   
    bullet.kill();
    enemie.life -= (player.player.damage - enemie.defense);       
    scoreText.text = scoreString + (points += 10 );
    if(enemie.life <= 0)
    {
        enemie.kill();
    }  
}
function collisionMagmaHandler()
{    
    healthbar.width = this.player.health;
    this.player.health -= 1;    
    if(this.player.health <= 0){
        
        this.player.health = 0;
        if(player.player.animations.name === "left")            
        {
            player.deathleft();
        }else if(player.player.animations.name === "right")
        {
            player.deathright();
        }       
    }
}
function collisionHandlerLayer(bullet)
{
    bullet.kill();
}