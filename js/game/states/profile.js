Game.Profile = function(game){
    
};

    Game.Profile.prototype = {
        preload:function(){
            let cosa;
            let img ="";            
            let url = new URL("http://localhost:3000/user/getUserData");
                        let params = {id: variables.userId};
                        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                        fetch(url, {
                            method: "GET",
                            mode: "cors" }).then((user) => {
                               return user.json();
                            }).then(data => {
                                this.load.image('menu', data.UserPhoto);  
                            });                  
                                      
        },
        create:function(){    
            this.game.add.sprite(200, 200, 'menu');
            
        }        
    }