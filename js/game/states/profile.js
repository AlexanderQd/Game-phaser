Game.Profile = function(game){
    
};

    Game.Profile.prototype = {
        preload:function(){
            this.load.image('menu', '../../assets/button/button_main-menu.png');
            fetch("http://localhost:3000/cookies", {
                method: "GET",
                mode: "cors"
            }).then(res => {console.log(res.json())})
        },
        create:function(){    

            
        }        
    }