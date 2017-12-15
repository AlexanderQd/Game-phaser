Game.DelUsers = function(game){
    
};
    Game.DelUsers.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
            this.load.image('delete', '../../assets/button/button_delete.png');
            this.load.image('menu', '../../assets/button/button_main-menu.png');
        },
        create:function(){    
            
            this.game.stage.setBackgroundColor(0x2d2d2d);
            let email = this.add.inputField(this.world.centerX, this.world.centerY - 140, {
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
         
            let password = this.add.inputField(this.world.centerX, this.world.centerY - 70, {
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
            this.add.button(this.world.centerX - 5, this.world.centerY, 'delete', function(){
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
            this.add.button(this.world.centerX - 5, this.world.centerY + 70, 'menu', () => {
                this.game.state.start('MainMenu')
            });
            
        }        
    }
    