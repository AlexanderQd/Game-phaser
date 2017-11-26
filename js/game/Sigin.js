
Game.Sigin = function(game){
    
};
    Game.Sigin.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
           
        },
        create:function(){    
            
            this.add.tileSprite(0,0,800,600,'background');
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
            let  button = this.add.button(this.world.centerY, this.world.centerX, 'buttons', function(){           
                let form = new FormData();                
                form.append("password", password.value);
                form.append("email", email.value);            
                fetch("http://localhost:3000/user/getId", {
                    method: "POST",
                    mode: "cors",
                    param: form
                });    
            });
        }        
    }
    