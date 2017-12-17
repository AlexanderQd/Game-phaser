Game.SelectChar = function(game){ 
};

Game.SelectChar.prototype = {
    preload:function(){ 
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.spritesheet('purple-dragon', '../../assets/Character/p0.png');
        this.load.spritesheet('red-dragon', '../../assets/Character/r0.png');
        this.game.load.image('description-area', '../../assets/description-area.png');
        this.game.load.image('character-area', '../../assets/button/character-area.png');
        this.game.load.image('left-arrow', '../../assets/button/left-arrow.png');
        this.game.load.image('right-arrow', '../../assets/button/right-arrow.png');

        fetch("http://localhost:3000/selectCharacter",{
            method: "GET",
            mode: "cors"  
        }).then((res) => {
            return res.json()
        }).then(response => {
            response.forEach( data =>{
                variables.arrayCharacters.push(data);
            })
        })
    },
    create:function(){

        let count = 0;
        let character;

        this.game.stage.setBackgroundColor(0x2d2d2d);
        let SelectCharText = "Seleccione su personaje";        
        
        let area =  this.game.add.sprite(200, 200, 'description-area');
        let characterArea = this.game.add.sprite(this.world.centerX - 75, this.world.centerY - 250, 'character-area');
        characterArea.scale.setTo(4);
        
        let right = this.game.add.button(characterArea.world.x + 200, characterArea.world.y + 45, 'right-arrow', () => {           
            if(count >= variables.arrayCharacters.length - 1){
                count = 0;
                character = this.game.add.sprite(characterArea.world.x, characterArea.world.y, variables.arrayCharacters[count].name);
                character.scale.setTo(2);
            }else{
                count++;
                character = this.game.add.sprite(characterArea.world.x, characterArea.world.y, variables.arrayCharacters[count].name);
                character.scale.setTo(2);
            }           
        });
        right.scale.setTo(2.5);
        
        let left = this.game.add.button(characterArea.world.x -55, characterArea.world.y + 45, 'left-arrow', () => { 

            if(count <= 0){            
                count = variables.arrayCharacters.length - 1;
                character = this.game.add.sprite(characterArea.world.x, characterArea.world.y, variables.arrayCharacters[count].name);
                character.scale.setTo(2);
            }else{
                count--;              
                character = this.game.add.sprite(characterArea.world.x, characterArea.world.y, variables.arrayCharacters[count].name);
                character.scale.setTo(2);
            } 
        });
        left.scale.setTo(2.5);

        setTimeout(() => { createTextPersonaje(this.game, area),character = this.game.add.sprite(characterArea.world.x, characterArea.world.y, variables.arrayCharacters[0].name),
        character.scale.setTo(2)}, 1000);
        
    }
}
function createTextPersonaje(game, area) {
    
    let style = { font: "16px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: area.width, align: "center"};
    let texto ="";
    variables.arrayCharacters.forEach(data => {
                texto = data.description
        /*game.add.text(200, game.world.centerY + positionY, data.attack + " " + data.defense +" " + data.health +" "+ data.velocity +" "+ data.jump + " " + data.mana, { font: '16px Arial', fill: '#fff'});
        positionY += 100 */
    })
    

    game.add.text(0, 0 ,texto, style);
    let text = game.add.text(game.world.centerX + 10, 50, "Selecc your character");     

    text.anchor.setTo(0.5);
    text.font = 'Revalia';
    text.fontSize = 60;

    grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');
    text.fill = grd;

    text.align = 'center';
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    text.inputEnabled = true;
    text.input.enableDrag();
   

}