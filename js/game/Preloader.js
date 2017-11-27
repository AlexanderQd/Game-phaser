Game.Preloader = function(game){ 
};
let button;
Game.Preloader.prototype = {
    preload:function(){ 
        //load visual assets
        this.load.tilemap('map','../assets/maps/tilemaps/level1/level1.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tilemappaterns','../assets/maps/tilemaps/level1/patron.png');        
        this.load.image('background','../assets/maps/backgrounds/spooky.png');
        this.load.image('healthbar', '../assets/Character/health.png');
        //player
        //this.load.spritesheet('player', '../assets/Character/Walk/walk.png',56,57,20);
        this.load.atlas('player','../assets/Character/player.png','../assets/Character/player.json')
        this.load.audio('playershot','../assets/Character/shot/shot.ogg');
        this.load.audio('playerjump','../assets/Character/shot/jump.ogg');
        //shoot
        this.load.spritesheet('bullet','../assets/Character/shot/shot.png',25,21,20);
        
        //button        
        this.load.spritesheet('buttons','../assets/button/play.png');
        
        //enemie        
        this.load.atlas('demon','../assets/lpc/spritesheet.png', '../assets/lpc/sprites.json');
        this.load.atlas('demonfly','../assets/lpc/fly.png','../assets/lpc/fly.json');
        this.load.audio('epic', '../assets/audio/level1/level1.ogg');
    },
    create:function(){
        let game = this;
        button = this.add.button(this.world.centerY, this.world.centerX, 'buttons', function(){           
           this.game.state.start('Level1');
       });
    }
}