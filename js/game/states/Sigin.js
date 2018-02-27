/**
 * @author Alexander Quintana Diaz
 * @param {Object} game
 * @class
 * @classdesc This state represent login
 */
Game.Sigin = function(game){

};
let idUsuario;
Game.Sigin.prototype = {
    preload:function(){ 
    
        this.add.plugin(PhaserInput.Plugin);
        this.load.image('buttonsMenu','../../../assets/button/button_main-menu.png');
        this.load.image('github','../../../assets/github.png');
        this.load.image('google','../../../assets/google.png');
    },
    create:function(){    
        
        this.game.stage.setBackgroundColor(0x2d2d2d);
        let email = this.add.inputField(this.world.centerX -120, this.world.centerY - 200, {
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

        let name = this.add.inputField(this.world.centerX -120, this.world.centerY - 150, {
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

        let password = this.add.inputField(this.world.centerX -120, this.world.centerY -100, {
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
        this.add.button(this.world.centerX - 125, this.world.centerY + 50, 'buttonsSigin', function(){
            let value =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;      
            if(value.test(email.value))
            {                 
                if(password.value.length <= 15 && password.value.length > 5){
                    
                    if(name.value.length <= 20 && name.value.length > 4)
                    {
                        let url = new URL("http://localhost:3000/user/getUser");
                        params = {email: email.value};
                        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                        fetch(url, {
                            method: "GET",
                            mode: "cors"                    
                        }).then((res) => {
                           return res.json()                     
                        }).then( response => {
                            idUsuario = response.id;                            
                            if(!idUsuario){                                
                                let form = new FormData();
                                form.append("name", name.value);
                                form.append("password", password.value);
                                form.append("email", email.value);          
                                fetch("http://localhost:3000/user/create", {
                                    method: "POST",
                                    mode: "cors",
                                    body: form
                                }).then(message =>{
                                                                    
                                    if(message.statusText === "OK"){
                                        changeStateGame('Login');
                                    }
                                }).catch(err => {conexionError()});
                            }else{
    
                                email.setText("email ya existe");
                            }                            
                        }).catch(error => {conexionError()});

                    }else{
                        name.setText("4 a 20 caracteres");
                    }

                }else{
                    password.resetText();
                }
                 
            }else{                
                email.setText("valor incorrecto");
            }
          
        });
        
        this.add.button(this.world.centerX - 125 , this.world.centerY, 'buttonsMenu', () => {
            changeStateGame('MainMenu');
        })

        this.add.button(this.world.centerX - 100, this.world.centerY - 50, 'github', () => {
            window.open("http://localhost:3000/auth/github", "_self");
        })
        this.add.button(this.world.centerX - 30, this.world.centerY - 50, 'google', () => { 
            window.open("http://localhost:3000/auth/google", "_self");
            
        })
    }        
}
