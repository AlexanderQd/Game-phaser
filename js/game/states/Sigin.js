
Game.Sigin = function(game){
    
};

    Game.Sigin.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
            this.load.image('buttonsMenu','../../../assets/button/button_main-menu.png');
        },
        create:function(){    
            
            this.game.stage.setBackgroundColor(0x2d2d2d);
            
            let email = this.add.inputField(this.world.centerX - 50, this.world.centerY - 100, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Email',
                type: PhaserInput.InputType.text
            });    
         
            let password = this.add.inputField(this.world.centerX -50, this.world.centerY -50, {
                font: '18px Arial',
                fill: '#212121',
                fontWeight: 'bold',
                width: 150,
                padding: 8,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 6,
                placeHolder: 'Password',
                type: PhaserInput.InputType.password
            });
            this.add.button(this.world.centerX -60, this.world.centerY, 'buttonsSigin', function(){
                if(email.value ==="admin@gmail.com" && password.value === "admin")
                {
                    this.game.state.start('Admin');
                }else{
                    let url = new URL("http://localhost:3000/user/getUser");
                    params = {email: email.value, password: password.value};
                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                    fetch(url, {
                        method: "GET",
                        mode: "cors"                    
                    }).then((res) => {
                       return res.json()                        
                    }).then( response => {
                        idUsuario = response.id;                               
                    }).then(
                        this.game.state.start('Level1')
                    ); 
                }    
                              
            });
            this.add.button(this.world.centerX - 60, this.world.centerY + 50, 'buttonsMenu', () => {
                this.game.state.start('MainMenu')
            });
            
        }        
    }
    