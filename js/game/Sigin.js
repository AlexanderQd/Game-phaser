
Game.Sigin = function(game){
    
};
    Game.Sigin.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
           
        },
        create:function(){    
            
            this.add.tileSprite(0,0,this.world.width,this.world.height,'backgroundjungle');
            let email = this.add.inputField(this.world.centerX -50, 100, {
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
         
            let password = this.add.inputField(this.world.centerX -50, 200, {
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
            let  buttonSigin = this.add.button(this.world.centerX - 115, this.world.centerY - 150, 'buttonsSigin', function(){           
                let form = new FormData();                
                form.append("password", password.value);
                form.append("email", email.value);            
                fetch("http://localhost:3000/user/getId", {
                    method: "POST",
                    mode: "cors",
                    param: form
                });    
            });
            let buttonMenu = this.add.button(this.world.centerX - 200, this.world.centerY - 50, 'buttonsMenu', () => {
                this.game.state.start('MainMenu')
            });
            
        }        
    }
    