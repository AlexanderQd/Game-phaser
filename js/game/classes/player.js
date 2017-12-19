/**
 * @author Alexander Quintana Diaz
 * @class
 * @classdesc this class create player in game
 */
class Player {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} attack 
     * @param {number} defense 
     * @param {number} health 
     * @param {number} velocity 
     * @param {number} jump 
     * @param {number} mana 
     * @param {Object} game 
     * @param {Object} phaser 
     */
    constructor(x, y, attack, defense, health, velocity, jump, mana, game, phaser)
    {
       
        this.player = game.add.sprite(x,y,'player');
        game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5,0.5);        
        this.player.animations.add('right', phaser.Animation.generateFrameNames('',0, 4));   
        this.player.animations.add('left', phaser.Animation.generateFrameNames('',5, 9));
        this.player.animations.add('deathleft', phaser.Animation.generateFrameNames('',23, 33));
        this.player.animations.add('deathright', phaser.Animation.generateFrameNames('',10, 22));
        this.player.damage = attack;
        this.player.defense = defense;
        this.player.speed = velocity;
        this.player.mana = mana;
        this.player.level = 1;
        this.player.health = health;
        this.player.maxMana = this.player.mana;
        this.player.maxHealth = this.player.health;
        this.player.shotsound = game.add.audio('playershot');
        this.player.jumpsound = game.add.audio('playerjump');
        
    }
    /**
     * @description this function move player left with animation
     */
    left()
    {
        
        this.player.animations.play('left', 5, true);
        this.player.scale.setTo(1,1);
        this.player.body.velocity.x = - this.player.speed;            

    }
    /**
     * @description this function move player rigth with animation
     */
    right()
    {
       
        this.player.animations.play('right', 5, false);
        this.player.scale.setTo(1,1);
        this.player.body.velocity.x = this.player.speed;     
    }
    /**
     * @description this function allow player jump
     */
    up()
    {
        this.player.jumpsound.play();
        this.player.body.velocity.y = -700;
    }
    /**
     * @description this function freezing player
     */
    stop()
    {
        this.player.animations.stop(null,true);
        this.player.body.velocity.x = 0;
    }
    /**
     * 
     * @param {number} damage 
     * @description this function set how much damage do player
     */
    setDamage(damage)
    {
        this.player.damage += damage;
    }
    /**
     * @description this function allow player level up
     */
    setlevel()
    {
        this.player.level +=1;
    }
    /**
     * @description this function represent player deadth when player see righth
     */
    deathright()
    {
        let animationPlaying = this.player.animations.play('deathright', 5, false);
        this.player.body.velocity.x = 0;
        animationPlaying.onComplete.add(this.playerkill, this);
    }
    /**
     * @description this function reprsent plater deadth when player see left
     */
    deathleft()
    {
        let animationPlaying = this.player.animations.play('deathleft', 5, false);   
        this.player.body.velocity.x = 0
        animationPlaying.onComplete.add(this.playerkill, this);  
    }
    /**
     * @description this function destroy player
     */
    playerkill()
    {       
        this.player.kill();
    }
    /**
     * 
     * @param {number} x
     * @description this function allow player healing 
     */
    setHealth(x){
        this.player.health += x;
        if(this.player.health >= 100){
            this.player.health = 100;
        }
    }
    /**
     * 
     * @param {number} x
     * @description this function allow player regenere mana 
     */
    setMana(x){
        this.player.mana += x;
        if(this.player.mana >= 100){
            this.player.mana = 100;
        }
    }
}