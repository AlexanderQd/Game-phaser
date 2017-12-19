/**
 * @file class demonfly
 * @author Alexander Quintana Diaz
 * @class
 * @classdesc This class create a new Fly Demon in phaser game
 */
class DemonFly
{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {Object} game 
     * @param {Object} phaser 
     */
    constructor(x,y,game,phaser)
    {        
        this.demonfly = game.add.sprite(x,y,'demonfly');
        this.demonfly.anchor.setTo(0.5);
        this.demonfly.scale.setTo(2);       
        this.demonfly.animations.add('fly');        
        game.physics.arcade.enable(this.demonfly);
        this.demonfly.body.collideWorldBounds = true;
        this.demonfly.life = 100;
        this.demonfly.speed = 60;
        this.demonfly.positionleft = this.demonfly.position.x - 60;
        this.demonfly.positionup = this.demonfly.position.y - 50;
        this.demonfly.defense = 5;
    }
    /**
     * @method left
     * @description set movement to left
     */
    left()
    {
        this.demonfly.body.velocity.x = this.demonfly.speed;
        
    }
    /**
     * @method rigth
     * @description set movement to rigth
     */
    right()
    {
        this.demonfly.body.velocity.x = - this.demonfly.speed;        
    }
    /**
     * @method up
     * @description set movement up
     */
    up()
    {
        this.demonfly.body.velocity.y = this.demonfly.speed;
    }
    /**
     * @method down
     * @description set movement down
     */
    down()
    {
        this.demonfly.body.velocity.y = - this.demonfly.speed;
    }
    /**
     * @method fly
     * @description create movement with the others functions
     */
    fly()    
    { 
        if(this.demonfly.body.position.x >= this.demonfly.positionleft){
            this.right();            
        }else if(this.demonfly.body.position.x < this.demonfly.positionleft - 300){            
            this.left(); 
        }
        if(this.demonfly.body.position.y >= this.demonfly.positionup)
        {            
            this.down();
        }else if(this.demonfly.body.position.y < this.demonfly.positionup - 100)
        {          
            this.up();
        }
    }
}