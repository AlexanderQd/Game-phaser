/**
 * @author Alexander Quintana Diaz
 * @param {Object} game 
 */
Game.Admin = function(game){
    
};

    Game.Admin.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);            
            this.load.image('delete-users', '../../assets/button/button_delete-user.png');
            this.load.image('consult-scores', '../../assets/button/button_scores.png');
            this.load.image('delete-match', '../../assets/button/button_delete-match.png');
            this.load.image('list-users', '../../assets/button/button_list-users.png');
            this.load.image('menu', '../../assets/button/button_main-menu.png');
        },
        create:function(){    
            this.game.stage.setBackgroundColor(0x2d2d2d);
            
            this.add.button(this.world.centerX, this.world.centerY - 210, 'delete-users', function(){
                this.game.state.start('DelUsers')           
            });
            this.add.button(this.world.centerX, this.world.centerY -140, 'consult-scores', function(){
                this.game.state.start('ConsultScores')
            });
            this.add.button(this.world.centerX, this.world.centerY - 70, 'delete-match', function(){
                this.game.state.start('DelMatchs')
            });
            this.add.button(this.world.centerX, this.world.centerY, 'list-users', function(){
                this.game.state.start('ListUsers')
            });
            this.add.button(this.world.centerX, this.world.centerY + 70, 'menu', () => {
                this.game.state.start('MainMenu')
            });
            
        }        
    }
    