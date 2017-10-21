class Player {
    constructor(x,y,game)
    {              
       
        this.player = game.add.sprite(x,y,'player');
        game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5,0.5);
        this.player.animations.add('right',[5,8],5,true);
        this.player.animations.add('left',[0,4],5,true);
         
    }
    right()
    {
        
        this.player.animations.play('left');
        this.player.scale.setTo(1,1);
        this.player.body.velocity.x = -playerSpeed;

    }
    left()
    {
       
        this.player.animations.play('right');
        this.player.scale.setTo(1,1);
        this.player.body.velocity.x = playerSpeed;
    }
    up()
    {
        this.player.body.velocity.y = -600;
    }
    stop()
    {
        this.player.animations.stop(null,true);
        this.player.body.velocity.x = 0;
    }   
    
}