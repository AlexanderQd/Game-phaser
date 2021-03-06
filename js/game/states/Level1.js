/**
 * @file Contain level 1 of game
 * @author Alexander Quintana Diaz
 * @description This file contain all necesary to play this states phaser game
 * @param {Objec} game
 * @class
 * 
 */

Game.Level1 = function(game){};

let map;
let layer;
//spawns
const spanwChests = 24;
const spanwWalkDemons = 0;
const wallSpawn = 1;
const spikeSpawn = 10;
const saveSpawn = 29;
//groups
let wallGroup;
let chestGroup;
let walkDemonGroup;
let potionGroup;
let spikeGroup;
let save;
//player
let player;
let controls = {};
//interface
let healthbar;
let manabar;
let emptybarhealth;
let emptybarmana;
let points = 0;
let scoreString = '';
let scoreText;
//walkDemons
let demons = [];
let demonCount;
let demonsfly = [];
let walkDemonCollisionCount = 0;
//chests
let chests = [];
//bullets
let bullets;
let fireRate = 500;
let nextFire = 0;

Game.Level1.prototype = {
    preload:function(){
        this.load.tilemap('map','../../assets/maps/tilemaps/level1/Level1.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tilemappaterns','../../assets/maps/tilemaps/level1/pattern.png'); 
        this.load.image('backgroundLevel1','../../assets/maps/backgrounds/redi/spooky.png');
        this.load.image('wall', '../../assets/maps/paredes.png');
        this.load.image('spike','../../assets/maps/tilemaps/level1/spike.png');
        this.load.spritesheet('save','../../assets/maps/save.png', 128, 128, 32);
        this.load.atlas('player',variables.characterSelected.img_route,variables.characterSelected.json_route);
    },
    create:function()
    {        
       
        //========================create background===========================
        this.add.tileSprite(0,0,6400,3500,'backgroundLevel1');

        //==========================add map=================================== 
        map = this.add.tilemap('map',64,64);        
        map.addTilesetImage('tilemappaterns');
        
        //=======================create layer of map==========================
        layer = map.createLayer(0);    
        layer.resizeWorld();       
        
        //====================collitions map with sprites======================
        
        map.setCollisionBetween(23,24);
        map.setCollisionBetween(34,35);
        
        //=====================add level music==================================
        let music = this.add.audio('epic');
        music.play('', 0, 1, true);
        music.onLoop.add(this.playLevelMusic, music);
        //========================add interface=================================       
        emptybarhealth = this.add.sprite(window.innerWidth / 2 - 103, 20, 'emptybar');
        emptybarhealth.fixedToCamera = true;
        emptybarhealth.width = variables.characterSelected.health + 10;
        
        emptybarmana = this.add.sprite(window.innerWidth / 2 + 80, 20, 'emptybar');
        emptybarmana.fixedToCamera = true;
        emptybarmana.width = variables.characterSelected.health + 10;

        healthbar = this.add.sprite(emptybarhealth.x + 6 , emptybarhealth.y + 4,'healthbar');
        healthbar.fixedToCamera = true;
        healthbar.width = variables.characterSelected.mana;

        manabar = this.add.sprite(emptybarmana.x + 6, emptybarmana.y + 4, 'manabar');
        manabar.fixedToCamera = true;
        manabar.width = variables.characterSelected.mana;

        scoreString = 'Score: ';
        scoreText = this.add.text(10,50, scoreString + points, { font: '34px Arial', fill: '#fff'});        
        scoreText.fixedToCamera = true;       
        
        //=====================create player================================== 
        player = new Player(0,3000, variables.characterSelected.attack, variables.characterSelected.defense, variables.characterSelected.health, 
            variables.characterSelected.velocity, variables.characterSelected.jump, variables.characterSelected.mana, this.game,Phaser);

        this.camera.follow(player.player);
        player.player.body.collideWorldBounds = true;
        player.player.body.gravity.y = 1400;
        player.player.animations.play('right', 5, true);

        //====================controls for player==========================================
        
        controls = {
           right: this.input.keyboard.addKey(Phaser.Keyboard.D),
           left: this.input.keyboard.addKey(Phaser.Keyboard.A),
           up: this.input.keyboard.addKey(Phaser.Keyboard.W),
           menu: this.input.keyboard.addKey(Phaser.Keyboard.ESC)
       };      
       
        //=======================add bullets===================================
        bullets = this.add.group();
        bullets.enableBody = true;
        bullets.enableBodyType = Phaser.Physics.ARCADE;        

        bullets.createMultiple(100, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);

        //==================initialice groups======================================
        wallGroup = this.game.add.group();
        demonWalkGroup = this.game.add.group();
        chestGroup = this.game.add.group();
        potionGroup = this.game.add.group();
        spikeGroup = this.game.add.group();

        //=======================create enemies, chests, walls========================
        let mapArray = layer.getTiles(0, 0, this.game.world.width, this.game.world.height);
        let countWalkDemon = 0;
        let countChest = 0;
        for(let i = 0; i < mapArray.length; i++)
        {
            if(mapArray[i].index === spanwChests){
                chests[countChest] = new Chest(mapArray[i].worldX + 50, mapArray[i].worldY, this.game);
                chestGroup.add(chests[countChest].chest);                
                countChest++;
            }
            if(mapArray[i].index === spanwWalkDemons){
                demons[countWalkDemon] = new Demon(mapArray[i].worldX , mapArray[i].worldY, this.game, Phaser);
                demonWalkGroup.add(demons[countWalkDemon].demon);
                countWalkDemon++;
            }
            if(mapArray[i].index === wallSpawn){
                let wall = this.game.add.sprite(mapArray[i].worldX + 50, mapArray[i].worldY, 'wall');
                this.game.physics.arcade.enableBody(wall);                
                wall.alpha = 0;
                wall.body.immovable = true;
                wallGroup.add(wall);
            }
            if(mapArray[i].index === spikeSpawn){
                let spike = this.game.add.sprite(mapArray[i].worldX -30, mapArray[i].worldY, 'spike');
                this.game.physics.arcade.enable(spike);
                spike.scale.setTo(0.2);
                spike.anchor.setTo(-0.5);
                spike.body.immovable = true;
                spikeGroup.add(spike);
            }
            if(mapArray[i].index === saveSpawn){
                save = this.game.add.sprite(mapArray[i].worldX -30, mapArray[i].worldY - 35, 'save');
                this.game.physics.arcade.enable(save);
                let animation = save.animations.add('saveAnimation');
                save.animations.play('saveAnimation', 10, true);
            }
        }



    },
    update:function(){
       
        //=========================collitions handles============================
        this.physics.arcade.collide(player.player,layer);
        this.physics.arcade.overlap(potionGroup, player.player, collisionHandlerLoot, null, this);
        this.physics.arcade.overlap(spikeGroup, player.player, collisionHandlerSpike, null, this);
        this.physics.arcade.overlap(save, player.player, saveGame, null, this);
        
        this.physics.arcade.collide(demonWalkGroup,layer);
        this.physics.arcade.collide(wallGroup, demonWalkGroup, collisionEnemieWithWalls, null, this);        
        
        this.physics.arcade.collide(chestGroup, layer);
        this.physics.arcade.collide(potionGroup, layer);
     
        this.physics.arcade.overlap(bullets, demonWalkGroup, collisionHandler, null, this);      
        this.physics.arcade.collide(bullets, layer, collisionHandlerLayer, null, this);
        this.physics.arcade.collide(bullets, chestGroup, collisionChestHandler, null, this);

 

        //===============controller with of bar life and mana===================================
        
        healthbar.width = player.player.health;
        manabar.width = player.player.mana;

        //=======================player animations===============================================
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
        if(controls.up.isDown &&  player.player.frame < 10 && player.player.body.onFloor() )
        {
            player.up();            
        }
                
     
        //========================handler fire========================================
        if(this.input.activePointer.isDown)
        {   let time = this.time.now;
            fire(this.game,player.player,bullets);            
        }
        //==================menu controlle (pendiente)================================
       if(controls.menu.isDown)
       {           
           this.menuState();
       }
    
    },
    //=======================play music level on loop=================================
    playLevelMusic: function(){
         this.play('', 0, 1, true);
    },
    //=============================show menu state (pendiente)==========================
    menuState: function()
    {
        this.game.state.start('MainMenu');
    },
}

/**
 * 
 * @param {Object} game 
 * @param {Object} player 
 * @param {Array} bullets
 * @description this function create player fire shot to kill enemies
 */
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

/**
 * 
 * @param {Array} bullet 
 * @param {Object} enemie
 * @description this function handler the collision between enemies and bullets
 */
function collisionHandler(bullet, enemie)
{   
    bullet.kill();    
    enemie.life -= (player.player.damage - enemie.defense);       
    if(enemie.life <= 0)
    {
        if(enemie.key ==="demon"){
            scoreText.text = scoreString + (points += 100);
        }
        enemie.kill();
    }  
}

/**
 * 
 * @param {Object} wall 
 * @param {Object} demon 
 * @description this function handler the collision between wall and enemies to generate movement
 */
function collisionEnemieWithWalls(wall, demon)
{    
    if(demon.animations.name === "left"){
        demon.body.velocity.x = -demon.speed;
        demon.animations.play('right',5,true);
        
    }else{
        demon.body.velocity.x =  demon.speed;
        demon.animations.play('left',5,true);
        
    }
}

/**
 * 
 * @param {array} bullet
 * @description this function destroy bullet between collision with map
 */
function collisionHandlerLayer(bullet)
{
    bullet.kill();
}

/**
 * 
 * @param {Object} bullet 
 * @param {Object} chest
 * @description this function handler the collision between bullets and chest when this collision chest destroy and drop loot
 * @see Chest
 */
function collisionChestHandler(bullet, chest){
    bullet.kill();
    let number = Math.floor((Math.random() * 500) + 1);
    let item;        
    if(number > 1 && number < 25){
        item = 0;
    }else if(number > 24 && number < 300){
        item = 1;
    }else if(number > 299 && number < 501){
        item = 2;
    } 
    loot = new Loot(chest.x, chest.y - 20, this.game, chest.spawnloot[item]);
    
    potionGroup.add(loot.loot);
    chest.kill();  
}

/**
 * 
 * @param {Object} thisplayer 
 * @param {Object} spike
 * @description this function handler the collision between player and spikes
 */
function collisionHandlerSpike(thisplayer, spike){
    
    thisplayer.health -= 1;
    
    if(thisplayer.health <= 0){
        
        thisplayer.health = 0;
        if(player.player.animations.name === "left")            
        {
            player.deathleft();
        }else if(player.player.animations.name === "right")
        {
            player.deathright();
        }
    }     
}
