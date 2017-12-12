
class Player {
    constructor(x,y,game,phaser)
    {
       
        this.player = game.add.sprite(x,y,'player');
        game.physics.arcade.enable(this.player);
        this.player.anchor.setTo(0.5,0.5);        
        this.player.animations.add('right', phaser.Animation.generateFrameNames('',0, 4));   
        this.player.animations.add('left', phaser.Animation.generateFrameNames('',5, 9));
        this.player.animations.add('deathleft', phaser.Animation.generateFrameNames('',23, 33));
        this.player.animations.add('deathright', phaser.Animation.generateFrameNames('',10, 22));
        this.player.damage = 10;
        this.player.speed = 250;
        this.player.mana = 100;
        this.player.level = 1;
        this.player.health = 100;
        this.player.maxMana = 100;
        this.player.maxHealth = 100;
        this.player.shotsound = game.add.audio('playershot');
        this.player.jumpsound = game.add.audio('playerjump');
        
    }
    left()
    {
        
        this.player.animations.play('left', 5, true);
        this.player.scale.setTo(1,1);
        this.player.body.velocity.x = - this.player.speed;            

    }
    right()
    {
       
        this.player.animations.play('right', 5, false);
        this.player.scale.setTo(1,1);
        this.player.body.velocity.x = this.player.speed;     
    }
    up()
    {
        this.player.jumpsound.play();
        this.player.body.velocity.y = -700;
    }
    stop()
    {
        this.player.animations.stop(null,true);
        this.player.body.velocity.x = 0;
    } 
    setDamage(damage)
    {
        this.player.damage += damage;
    }
    setlevel()
    {
        this.player.level +=1;
    }
    deathright()
    {
        let animationPlaying = this.player.animations.play('deathright', 5, false);
        this.player.body.velocity.x = 0;
        animationPlaying.onComplete.add(this.playerkill, this);
    }
    deathleft()
    {
        let animationPlaying = this.player.animations.play('deathleft', 5, false);   
        this.player.body.velocity.x = 0
        animationPlaying.onComplete.add(this.playerkill, this);  
    }
    playerkill()
    {       
        this.player.kill();
    }
    setHealth(x){
        this.player.health += x;
        if(this.player.health >= 100){
            this.player.health = 100;
        }
    }
    setMana(x){
        this.player.mana += x;
        if(this.player.mana >= 100){
            this.player.mana = 100;
        }
    }
}