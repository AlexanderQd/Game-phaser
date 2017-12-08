
Game.Login = function(game){

};
Game.Login.prototype = {
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

        let name = this.add.inputField(this.world.centerX -50, 150, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 150,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Name',
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
        this.add.button(this.world.centerX - 120, this.world.centerY - 135, 'buttonsLogin', function(){
            let value =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;      
            if(value.test(email.value))
            {                 
                if(password.value.length <= 15 && password.value.length > 5){

                    if(name.value.length <= 20 && name.value.length > 4)
                    {
                        let form = new FormData();
                        form.append("name", name.value);
                        form.append("password", password.value);
                        form.append("email", email.value);          
                        fetch("http://localhost:3000/user/create", {
                            method: "POST",
                            mode: "cors",
                            body: form
                        });
                    }else{
                        name.setText("4 a 20 caracteres")
                    }

                }else{
                    password.resetText();
                }
                 
            }else{                
                email.setText("valor incorrecto");
            }
          
        });
        
        this.add.button(this.world.centerX - 250 , this.world.centerY - 50, 'buttonsMenu', () => {
            this.game.state.start('MainMenu')
        })
    }        
}
