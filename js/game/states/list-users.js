Game.ListUsers = function(game){
    
};
    Game.ListUsers.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
           
        },
        create:function(){    
            this.game.stage.setBackgroundColor(0x2d2d2d);
          
            
        }        
    }