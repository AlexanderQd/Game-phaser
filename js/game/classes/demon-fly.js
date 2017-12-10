/*
    Class demon 
    constructor position x y and var game 
    add anchor, scale and animations
    add physics and body
    
*/

class DemonFly
{
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
    left()
    {
        this.demonfly.body.velocity.x = this.demonfly.speed;
        
    }
    right()
    {
        this.demonfly.body.velocity.x = - this.demonfly.speed;        
    }
    up()
    {
        this.demonfly.body.velocity.y = this.demonfly.speed;
    }
    down()
    {
        this.demonfly.body.velocity.y = - this.demonfly.speed;
    }
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