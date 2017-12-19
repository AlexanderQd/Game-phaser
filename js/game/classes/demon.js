/**
 * @file class demon
 * @author Alexander Quintana Diaz
 * @class
 * @classdesc This class generate a new sprite demon in phaser game
 */
class Demon
{
    /**
     * @constructor
     * @param {number} x 
     * @param {number} y 
     * @param {Object} game 
     * @param {Object} phaser
     * @description create new demon with weight animations, sprites, movement, defense, life, speed, gravity
     */
    constructor(x,y,game,phaser)
    {        
        this.demon = game.add.sprite(x,y,'demon');
        this.demon.anchor.setTo(0.5);
        this.demon.scale.setTo(2);       
        this.demon.animations.add('left', phaser.Animation.generateFrameNames('',1,4));
        this.demon.animations.add('right',phaser.Animation.generateFrameNames('',6,8));
        game.physics.arcade.enable(this.demon);
        this.demon.body.collideWorldBounds = true;
        this.demon.life = 100;
        this.demon.speed = 100;        
        this.demon.body.gravity.y = 1400;
        this.demon.defense = 0;        
        this.demon.animations.play('left',5,true);
        this.demon.body.velocity.x =  this.demon.speed; 
    }

}