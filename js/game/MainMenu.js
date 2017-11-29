Game.MainMenu = function(game){ 
};
Game.MainMenu.prototype = {
    preload:function(){ 
        //load visual assets
        this.load.image('backgroundjungle','../assets/maps/backgrounds/jungle.png');
        //button        
        this.load.spritesheet('buttonsSave','../assets/button/save.png');
        this.load.spritesheet('buttonsSigin','../assets/button/sigin.png');
        this.load.spritesheet('buttonsLogin','../assets/button/login.png');
        this.load.spritesheet('buttonsStart','../assets/button/start.png');
        this.load.spritesheet('buttonsDelete','../assets/button/delete.png');
        this.load.spritesheet('buttonsSearch','../assets/button/search.png');
              
    
    },
    create:function(){
               
        this.add.tileSprite(0,0,this.world.width,this.world.height,'backgroundjungle');

        let buttonStartLevel = this.add.button(this.world.centerX - 150, this.world.centerY - 175, 'buttonsStart', () => {
            this.game.state.start('Level1');
        });
        let buttonLogin = this.add.button(this.world.centerX - 150, this.world.centerY - 70, 'buttonsLogin', () => {
            this.game.state.start('Login');
        });

        let button = this.add.button(this.world.centerX - 150, this.world.centerY + 50, 'buttonsSigin', () => {           
           this.game.state.start('Sigin');
       });
    }
}