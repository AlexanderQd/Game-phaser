Game.DelUsers = function(game){
    
};
    Game.DelUsers.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
            this.load.image('delete', '../../assets/button/delete.png');
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
         
            let password = this.add.inputField(this.world.centerX -50, 150, {
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
            this.add.button(this.world.centerX - 115, this.world.centerY - 150, 'delete', function(){
                if(password.value === "admin")
                {
                    let form = new FormData();
                    form.append("email", email.value);
                    fetch("http://localhost:3000/deleteUser",{
                        method: "delete",
                        mode: "cors",
                        body: form                     
                    });  
                }                            
            });
            this.add.button(this.world.centerX - 200, this.world.centerY - 50, 'buttonsMenu', () => {
                this.game.state.start('MainMenu')
            });
            
        }        
    }
    