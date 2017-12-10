class Loot{
    constructor(x, y, game, img){
        this.loot = game.add.sprite(x, y, img);
        this.loot.anchor.setTo(0.09);
        this.loot.scale.setTo(0.09);
        game.physics.arcade.enable(this.loot);
        this.loot.body.collideWorldBounds = true;
        this.loot.body.gravity.y = 1400;        
    }
}