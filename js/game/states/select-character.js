/**
 * @author Alexander Quintana Diaz
 * @param {Object} game
 * @class
 * @classdesc This state allow change your charact for you game
 */
Game.SelectChar = function(game){ 
};
let character;
let description;
let characterAtributesText;
let thisGame;

Game.SelectChar.prototype = {
    preload:function(){

        //add necessary assets for this state
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        this.load.image('purple-dragon', '../../assets/Character/p0.png');
        this.load.image('red-dragon', '../../assets/Character/r0.png');
        this.game.load.image('description-area', '../../assets/description-area.png');
        this.game.load.image('character-area', '../../assets/button/character-area.png');
        this.game.load.image('left-arrow', '../../assets/button/left-arrow.png');
        this.game.load.image('right-arrow', '../../assets/button/right-arrow.png');

        
        /**
         * @param {url}
         * @return {Object}
         * @description download necessary datas from server
         */
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

        this.game.stage.setBackgroundColor(0x2d2d2d);

        let SelectCharText = "Seleccione su personaje";        
        
        thisGame = this.game;

        let descriptionArea =  this.game.add.sprite(200, 200, 'description-area');
        let characterArea = this.game.add.sprite(this.world.centerX - 75, this.world.centerY - 250, 'character-area');
        characterArea.scale.setTo(4);
        
        let right = this.game.add.button(characterArea.world.x + 200, characterArea.world.y + 45, 'right-arrow', () => {           
            if(count >= variables.arrayCharacters.length - 1){
                count = 0;
            }else{
                count++;               
            }
            setCharacterAndDatas(characterArea.world, variables.arrayCharacters[count], this.game, descriptionArea);         
        });
        right.scale.setTo(2.5);
        
        let left = this.game.add.button(characterArea.world.x -55, characterArea.world.y + 45, 'left-arrow', () => { 

            if(count <= 0){            
                count = variables.arrayCharacters.length - 1;                
            }else{
                count--;               
            }
            setCharacterAndDatas(characterArea.world, variables.arrayCharacters[count], this.game, descriptionArea);
        });
        left.scale.setTo(2.5);

        setTimeout(() => { createTextPersonaje(this.game), setCharacterAndDatas(characterArea.world, variables.arrayCharacters[0], this.game, descriptionArea)}, 1000);

        
        
    }
}
/**
 * 
 * @param {Object} game
 * @description this function add game text with style
 */
function createTextPersonaje(game) {      

    
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
/**
 * 
 * @param {Object} coordinates 
 * @param {Array} datas 
 * @param {Object} game 
 * @param {Object} descriptionArea 
 * 
 * @description this function add and change character and his datas when you push the button 
 */
function setCharacterAndDatas(coordinates, datas, game,  descriptionArea) {
    let style = { font: "16px Arial", fill: "#fff", wordWrap: true, wordWrapWidth: descriptionArea.width, align: "center"};
    let descriptionCharacter = "";
    let characterAtributtes = "";

    if(character != null){
        character.destroy();
    }
    character = game.add.sprite(coordinates.x + 46, coordinates.y + 30,datas.name);
    character.scale.setTo(2);

    if(description != null){
        description.destroy();
        characterAtributesText.destroy();       
    }
    descriptionCharacter = datas.description;
    description = game.add.text(coordinates.x -20, coordinates.y + 200 ,descriptionCharacter, style);
    
    characterAtributtes = "Damage: " + datas.attack + "\n" + "Defense: " + datas.defense + "\n" 
    + "Health: " + datas.health + "\n" + "Mana: " + datas.mana + "\n" + "Speed: " + datas.velocity + "\n" + "Jump: " + datas.jump;

    characterAtributesText = game.add.text(coordinates.x + 60, coordinates.y + 300 , characterAtributtes , style);

    character.inputEnabled = true;
    character.events.onInputDown.add(listener, this);
}
/**
 * 
 * @param {Object} char
 * @description this function select character when you clicked him
 */
function listener(char){
    variables.arrayCharacters.forEach(personage => {
        if(char.key === personage.name){
            variables.characterSelected = personage;
            thisGame.state.start('Level1');
        }
    })

}