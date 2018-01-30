Game.MainMenu = function(game){ 
};
Game.MainMenu.prototype = {
    preload:function(){        
        //button        
        this.load.spritesheet('buttonsSave','../assets/button/button_save.png');
        this.load.spritesheet('buttonsSigin','../assets/button/button_sigin.png');
        this.load.spritesheet('buttonsLogin','../assets/button/button_login.png');        
        this.load.spritesheet('buttonsDelete','../assets/button/button_delete.png');
        this.load.spritesheet('buttonsSearch','../assets/button/button_search.png');
        this.load.spritesheet('buttonScores','../assets/button/button_scores.png');
        
        getIdFromURL();
        variables.userId = sessionStorage.getItem("key");
    },
    create:function(){
        this.game.stage.setBackgroundColor(0x2d2d2d);
      
        this.game.add.button(this.world.centerX - 150, this.world.centerY - 70, 'buttonsSigin', () => {           
            this.game.state.start('Sigin');
        });
        this.game.add.button(this.world.centerX - 150, this.world.centerY, 'buttonsLogin', () => {
            this.game.state.start('Login');
        });
        this.game.add.button(this.world.centerX - 150, this.world.centerY + 70, 'buttonScores', () => {
            this.game.state.start('Profile');
        });

    }
}