Game.Admin = function(game){
    
};
    Game.Admin.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
            this.load.image('delete-users', '../../assets/button/delete-user.png');
            this.load.image('consult-scores', '../../assets/button/consult-scores.png');
            this.load.image('delete-match', '../../assets/button/delete-match.png');
            this.load.image('list-users', '../../assets/button/list-users.png');
            this.load.image('menu', '../../assets/button/main-menu.png');
        },
        create:function(){    

            this.add.button(this.world.centerX - 350, this.world.centerY - 300, 'delete-users', function(){
                                    
            });
            this.add.button(this.world.centerX - 350, this.world.centerY -200, 'consult-scores', function(){
                
            });
            this.add.button(this.world.centerX - 350, this.world.centerY - 100, 'delete-match', function(){
                
            });
            this.add.button(this.world.centerX - 350, this.world.centerY, 'list-users', function(){
                
            });
            this.add.button(this.world.centerX - 350, this.world.centerY + 100, 'menu', () => {
                this.game.state.start('MainMenu')
            });
            
        }        
    }
    