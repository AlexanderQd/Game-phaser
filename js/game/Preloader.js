Game.Preloader = function(game){ 
};
let button;
Game.Preloader.prototype = {
    preload:function(){ 
        //load visual assets
        this.load.tilemap('map','../assets/maps/tilemaps/level1/level1.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tilemappaterns','../assets/maps/tilemaps/level1/patron.png');        
        this.load.image('background','../assets/maps/backgrounds/spooky.png');

        //player
        this.load.spritesheet('player', '../assets/Character/Walk/walk.png',56,57,20);
        //shoot
        this.load.spritesheet('bullet','../assets/Character/shot/shot.png',25,21,20);
        
        //button        
        this.load.spritesheet('buttons','../assets/button/play.png');
        
        //enemie        
        this.load.atlas('demon','../assets/lpc/spritesheet.png', '../assets/lpc/sprites.json');
        this.load.atlas('demonfly','../assets/lpc/fly.png','../assets/lpc/fly.json');

    },
    create:function(){
        let game = this;
        button = this.add.button(this.world.centerY, this.world.centerX, 'buttons', function(){           
           this.game.state.start('Level1');
       });
    }
}