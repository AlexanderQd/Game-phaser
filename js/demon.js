/*
    Class demon 
    constructor position x y and var game 
    add anchor, scale and animations
    add physics and body
    
*/

class Demon
{
    constructor(x,y,game)
    {
        this.demon = game.add.sprite(x,y,'demon');
        this.demon.anchor.setTo(0.5);
        this.demon.scale.setTo(2);
        this.demon.animations.add('left', [8,11],5, true);
        this.demon.animations.add('rigth',[12,15],5,true);
        game.physics.arcade.enable(this.demon);
        this.demon.body.collideWorldBounds = true;
    }
    left()
    {
        this.demon.animations.play('left');
        this.demon.body.velocity.x = demonSpeed;
    }
    right()
    {
        this.demon.animations.play('rigth');
        this.demon.body.velocity.x = -demonSpeed;
    }
}