Game.Preloader = function(game){ 
};
Game.Preloader.prototype = {
    preload:function(){ 
        //load visual assets
        this.load.tilemap('map','../../assets/maps/tilemaps/level1/level1.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tilemappaterns','../../assets/maps/tilemaps/level1/patron.png');        
        this.load.image('backgroundhell','../../assets/maps/backgrounds/spooky.png');
        this.load.image('backgroundjungle','../../assets/maps/backgrounds/jungle.png');
        this.load.image('backgroundhills','../../assets/maps/backgrounds/hills.png');
        this.load.image('backgroundcity','../../assets/maps/backgrounds/city-ruins.png');
        this.load.image('healthbar', '../../assets/Character/health.png');
        this.load.image('backgroundLevel1','../../assets/maps/backgrounds/redi/spooky.png');
        //player        
        this.load.atlas('player','../../assets/Character/player.png','../assets/Character/player.json')
        this.load.audio('playershot','../../assets/Character/shot/shot.ogg');
        this.load.audio('playerjump','../../assets/Character/shot/jump.ogg');
        //shoot
        this.load.spritesheet('bullet','../../assets/Character/shot/shot.png',25,21,20);
        
        //button        
        this.load.spritesheet('buttonsSave','../../assets/button/save.png');
        this.load.spritesheet('buttonsSigin','../../assets/button/sigin.png');
        this.load.spritesheet('buttonsLogin','../../assets/button/login.png');
        this.load.spritesheet('buttonsStart','../../assets/button/start.png');
        this.load.spritesheet('buttonsDelete','../../assets/button/delete.png');
        this.load.spritesheet('buttonsSearch','../../assets/button/search.png');
        this.load.spritesheet('buttonsMenu','../../assets/button/main-menu.png');
        
        //enemie        
        this.load.atlas('demon','../../assets/lpc/spritesheet.png', '../assets/lpc/sprites.json');
        this.load.atlas('demonfly','../../assets/lpc/fly.png','../assets/lpc/fly.json');
        
        this.load.audio('epic', '../../assets/audio/level1/level1.ogg');
    },
    create:function(){
        this.game.state.start('Admin');
    }
}