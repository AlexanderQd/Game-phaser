Game.Preloader = function(game){
    this.preloadBar = null;
};
let button;
Game.Preloader.prototype = {
    preload:function(){
        this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY,'preloaderBar');

        this.preloadBar.anchor.setTo(0.5,0.5);
        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadBar);

        //load visual assets
        this.load.tilemap('map','../assets/lava.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tileset','../assets/maps/tilemaps/tiles-skulls.png');
        this.load.image('background','../assets/maps/backgrounds/spooky.png');

        //player
        this.load.spritesheet('player', '../assets/Character/Walk/walk.png',56,57,20);
        //shoot
        this.load.spritesheet('bullet','../assets/Character/shot/shotall.png',48,41,20);
        
        //button        
        this.load.spritesheet('buttons','../assets/button/play.png');
        
        //enemie
        this.load.spritesheet('demon','../assets/lpc/walk - sword.png',64,62,20);
       
    },
    create:function(){
        let game = this;
        button = this.add.button(0,0, 'buttons', function(){           
           this.game.state.start('Level1');
       });
    }
}