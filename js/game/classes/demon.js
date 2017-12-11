/*
    Class demon 
    constructor position x y and var game 
    add anchor, scale and animations
    add physics and body
    
*/
class Demon
{
    constructor(x,y,game,phaser)
    {        
        this.demon = game.add.sprite(x,y,'demon');
        this.demon.anchor.setTo(0.5);
        this.demon.scale.setTo(2);       
        this.demon.animations.add('left', phaser.Animation.generateFrameNames('',1,4));
        this.demon.animations.add('right',phaser.Animation.generateFrameNames('',5,8));
        game.physics.arcade.enable(this.demon);
        this.demon.body.collideWorldBounds = true;
        this.demon.life = 100;
        this.demon.speed = 100;
        this.demon.positionleft = this.demon.position.x;
        this.demon.body.gravity.y = 1400;
        this.demon.defense = 0;
        
        this.right();
    }
    left()
    {        
        this.demon.animations.play('left',5,true);
        this.demon.body.velocity.x =  this.demon.speed;        
    }
    right()
    {
        this.demon.animations.play('right',5,true);
        this.demon.body.velocity.x = - this.demon.speed;
    }/*
    patrol()
    {     
        if(this.demon.position.x >= this.demon.positionleft)
        {          
           this.right();

        }else if(this.demon.position.x < this.demon.positionleft - 300)
        {
           this.left();
        }
    }*/
}