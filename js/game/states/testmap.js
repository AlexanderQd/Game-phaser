

Game.testmap = function(game){};

//map
let map;
let layer;
let chests = [];
let loot;
let spriteloot;
const spawnchest = 24;
const spawnWalkDemon = 0;
let collisionChestCount = 0;
let wallSpawn = 29;
let wallGroup;
//player
let player;
let controls = {};
let healthbar;
let manabar;
let emptybarhealth;
let emptybarmana;
//enemie
let demons = [];
let demonWalkGroup;
let demonsfly = [];
let walkDemonCollisionCount = 0;
//shoot
let bullets;
let fireRate = 500;
let nextFire = 0;
//game interface
let points = 0;
let scoreString = '';
let scoreText;
Game.testmap.prototype = {
    preload:function(){
        this.load.tilemap('map','../../assets/maps/tilemaps/level1/testtilemap.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tilemappaterns','../../assets/maps/tilemaps/level1/pattern.png'); 
        this.load.image('backgroundLevel1','../../assets/maps/backgrounds/redi/spooky.png');
        this.load.image('wall', '../../assets/maps/paredes.png');
        
    },
    create:function()
    {
        
        /*
            background
        */
     
        this.add.tileSprite(0,0,1280, 1280, 'backgroundLevel1');       
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
        //audio======================================================
        let music = this.add.audio('epic');
        music.play('', 0, 1, true);
        music.onLoop.add(this.playLevelMusic, music);
        //=====================================================        
        emptybarhealth = this.add.sprite(window.innerWidth / 2 - 103, 20, 'emptybar');
        emptybarhealth.fixedToCamera = true;
        emptybarhealth.width = 110;
        
        emptybarmana = this.add.sprite(window.innerWidth / 2 + 80, 20, 'emptybar');
        emptybarmana.fixedToCamera = true;
        emptybarmana.width = 110;

        healthbar = this.add.sprite(emptybarhealth.x + 6 , emptybarhealth.y + 4,'healthbar');
        healthbar.fixedToCamera = true;
        healthbar.width = 100;

        manabar = this.add.sprite(emptybarmana.x + 6, emptybarmana.y + 4, 'manabar');
        manabar.fixedToCamera = true;
        manabar.width = 100;


        /*
            add player in position x y 
        */  
        player = new Player(0, 1000,this.game,Phaser);
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

        //chests
        let mapArray = layer.getTiles(0, 0, this.game.world.width, this.game.world.height);
        let countChest  = 0;
        let countWalkDemon = 0;
        wallGroup = this.game.add.group();
        demonWalkGroup = this.game.add.group();
        
        for(let i = 0; i < mapArray.length; i++)
        {
            if(mapArray[i].index === spawnchest){
                chests[countChest] = new Chest(mapArray[i].worldX + 50, mapArray[i].worldY, this.game);
                countChest++;
            }
            if(mapArray[i].index === spawnWalkDemon){
                demons[countWalkDemon] = new Demon(mapArray[i].worldX , mapArray[i].worldY, this.game, Phaser);
                demonWalkGroup.add(demons[countWalkDemon].demon);
                countWalkDemon++;
            }
            if(mapArray[i].index === wallSpawn){
                let wall = this.game.add.sprite(mapArray[i].worldX + 64, mapArray[i].worldY, 'wall');
                this.game.physics.arcade.enableBody(wall);                
                wall.visible = false;
                wall.body.immovable = true;
                wallGroup.add(wall);
            }
        }
        
        
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
        map.setTileIndexCallback(1, collisionMagmaHandler, demons, layer);   
    },
    update:function(){
       
        /*
            colitions 
        */
        
        
        this.physics.arcade.collide(player.player,layer);        
        this.physics.arcade.collide(demonWalkGroup,layer);


        this.physics.arcade.collide(wallGroup, demonWalkGroup, collisionMagmaHandler, null, this);        
        
        this.physics.arcade.collide(chests[collisionChestCount].chest, layer);
     
        this.physics.arcade.collide(spriteloot, layer);
        this.physics.arcade.overlap(spriteloot, player.player, collisionHandlerLoot, null, this);
     
        this.physics.arcade.overlap(bullets, demonWalkGroup, collisionHandler, null, this);
        this.physics.arcade.overlap(bullets, demonsfly[0].demonfly, collisionHandler, null, this);
        this.physics.arcade.collide(bullets, layer, collisionHandlerLayer, null, this);
        this.physics.arcade.collide(bullets, chests[collisionChestCount].chest, collisionChestHandler, null, this);

        //this.physics.arcade.collide(demons[1].demon,layer);
        demonsfly[0].demonfly.animations.play('fly', 5, true);

        //
        
        healthbar.width = player.player.health;
        manabar.width = player.player.mana;
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
        //demons[walkDemonCollisionCount].patrol();
        demonsfly[0].fly();
        //shooting
        if(this.input.activePointer.isDown)
        {   let time = this.time.now;
            fire(this.game,player.player,bullets);            
        }
       
       if(controls.menu.isDown)
       {           
           this.menuState();
       }

       //=======================================================================================
       collisionChestCount++;
       if(collisionChestCount >= chests.length){
           collisionChestCount = 0;
       }

       //=======================================================================================
       walkDemonCollisionCount++;
       if(walkDemonCollisionCount >= demons.length){
        walkDemonCollisionCount = 0;
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
    
    if(game.time.now > nextFire && bullets.countDead() > 0 && player.mana >= 5)
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
        player.mana -= 5;       
    }
}
function collisionHandler(bullet, enemie)
{   


    bullet.kill();    
    enemie.life -= (player.player.damage - enemie.defense);       
    scoreText.text = scoreString + (points += 10 );
    if(enemie.life <= 0)
    {
        enemie.kill();
    }  
}
function collisionMagmaHandler(wall, demon)
{   /* 
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
    }*/
    
    
}
function collisionHandlerLayer(bullet)
{
    bullet.kill();
}

function collisionChestHandler(chest, bullet){
    bullet.kill();
    console.log(chest);
    let img = chests[0].selectItem();
    loot = new Loot(chest.x, chest.y - 20, this.game, img);    
    spriteloot = loot.loot;
    chest.kill();    
}
function collisionHandlerLoot(potion){
    
    switch(potion.key){
        case 'powerpotion': player.setDamage(2);
            break;
        case 'manapotion': player.setMana(10);
            break;
        case 'lifepotion': player.setHealth(10);
            break;
    }
    potion.destroy();
}