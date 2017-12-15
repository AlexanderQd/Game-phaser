Game.Preloader = function(game){ 
};

Game.Preloader.prototype = {
    preload:function(){ 
        
        //load visual assets       
        this.load.image('healthbar', '../../assets/Character/bars/red.png');
        this.load.image('manabar', '../../assets/Character/bars/blue.png');
        this.load.image('emptybar', '../../assets/Character/bars/EmptyBar.png');
        
        //player        
        this.load.atlas('player','../../assets/Character/player.png','../assets/Character/player.json');
        this.load.audio('playershot','../../assets/Character/shot/shot.ogg');
        this.load.audio('playerjump','../../assets/Character/shot/jump.ogg');

        //shoot
        this.load.spritesheet('bullet','../../assets/Character/shot/shot.png',25,21,20);
        
        //enemie        
        this.load.atlas('demon','../../assets/lpc/spritesheet.png', '../assets/lpc/sprites.json');
        this.load.atlas('demonfly','../../assets/lpc/fly.png','../assets/lpc/fly.json');

        //music
        this.load.audio('epic', '../../assets/audio/level1/level1.ogg');
        
        //objects
        this.load.spritesheet('chest', '../../assets/objects/chest.png', 32, 32);
        this.load.spritesheet('lifepotion', '../../assets/objects/ptlife.png', 375, 375);
        this.load.spritesheet('manapotion', '../../assets/objects/ptmana.png', 375, 375);
        this.load.spritesheet('powerpotion', '../../assets/objects/ptpower.png', 375, 375);        
    },
    create:function(){
        this.game.state.start('MainMenu');
    }
}