Game.Preloader = function(game){
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload:function(){
        this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY,'preloaderBar');

        this.preloadBar.anchor.setTo(0.5,0.5);
        this.time.advancedTiming = true;

        this.load.setPreloadSprite(this.preloadBar);

        //cargando accesorios visuales
        this.load.tilemap('map','../assets/lava.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tileset','../assets/maps/tilemaps/tiles-skulls.png');
        this.load.image('background','../assets/maps/backgrounds/spooky.png');

        //jugador
        this.load.spritesheet('player', '../assets/Character/Walk/walk.png',56,57,20);
        //boton        
        this.load.spritesheet('buttons','../assets/button/play.png');
        
        //Enemigo
        this.load.spritesheet('demon','../assets/lpc/walk - sword.png',64,62,20);
       
    },
    create:function(){

        this.state.start('Level1');
    }
}