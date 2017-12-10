class Chest{
    constructor(x, y, game){
        this.chest = game.add.sprite(x, y, 'chest');
        this.chest.anchor.setTo(1);
        this.chest.scale.setTo(1);
        game.physics.arcade.enable(this.chest);
        this.chest.body.collideWorldBounds = true;
        this.chest.body.gravity.y = 1400;
        this.chest.spawnloot = ['powerpotion','manapotion','lifepotion'];        
    }
    spawn(){
        let number = Math.floor((Math.random() * 500) + 1);
        let item;        
        if(number > 1 && number < 25){
            item = 0;
        }else if(number > 24 && number < 300){
            item = 1;
        }else if(number > 299 && number < 501){
            item = 2;
        }        
        return item;
    }
    selectItem(){
        return this.chest.spawnloot[this.spawn()];
    }
}