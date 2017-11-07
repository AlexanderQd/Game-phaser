

Game.Level1 = function(game){};

//map
let map;
let layer;
//player
let player;
let controls = {};
const playerSpeed = 250;


//enemie
let demons = [];
const demonSpeed = 100;
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
        this.camera.follow(player.player);
        player.player.body.collideWorldBounds = true;
        player.player.body.gravity.y = 1400;    
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
        for(let i = 0; i < 4; i++)
        {
           /* demons[i] = new Demon(600,100,this.game);
            demons[1] = new Demon(1200,100,this.game);
            demons[2]*/
        }
        
       
        /*
            add the controls
        */
        controls = {
           right: this.input.keyboard.addKey(Phaser.Keyboard.A),
           left: this.input.keyboard.addKey(Phaser.Keyboard.D),
           up: this.input.keyboard.addKey(Phaser.Keyboard.W)
       };      
        //score
        scoreString = 'Score: ';
        scoreText = this.add.text(10,50, scoreString + points, { font: '34px Arial', fill: '#fff'});
        scoreText.fixedToCamera = true;        
    },
    update:function(){
        
        /*
            colitions between the player and the world
        */
        this.physics.arcade.collide(player.player,layer);        
        this.physics.arcade.collide(demons[0].demon,layer);
        this.physics.arcade.collide(demons[1].demon,layer);
           
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
            animations of the demons
        */
        
        if(demons[count].demon.position.x >= demons[count].demon.positionleft)
        {
           demons[count].right();
        }
        if(demons[count].demon.position.x < demons[count].demon.positionleft - 300)
        {
           demons[count].left();
        }
        //shooting
        if(this.input.activePointer.isDown)
        {   let time = this.time.now;
            fire(this.game,player.player,bullets);            
        }
       
        this.physics.arcade.overlap(bullets, demons[count].demon, collisionHandler, null, this);        
        
        if(count >= demons.length -1)
        {
            count = 0;
        }else{
            count ++;
        }
        
    },
    
}
function fire(game,player,bullets){   
    
    if(game.time.now > nextFire && bullets.countDead() > 0)
    {
        
        nextFire = game.time.now + fireRate;
        let bullet = bullets.getFirstDead();        
        
        bullet.animations.add('left',[0],5,true);
        bullet.animations.add('right',[1],5,true);
        if(player.animations.name ==='left')
        {  
            bullet.reset(player.x - 75 , player.y - 25);
            bullet.animations.play('left');
            bullet.body.velocity.x = - 400;
            
        }else{
            bullet.reset(player.x + 20 , player.y -25);
            bullet.animations.play('right');
            bullet.body.velocity.x = 400; 
        }
    }
}
function collisionHandler(demon, bullet)
{    
    bullet.kill();
    demon.life -= 10;       
    scoreText.text = scoreString + (points += 10 );
    if(demon.life <= 0)
    {
        demon.kill();
    }  
}