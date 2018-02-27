Game.Profile = function(game){};

let content;
let line = [];
let text;
let wordIndex = 0;
let lineIndex = 0;

let wordDelay = 60;
let lineDelay = 100;

Game.Profile.prototype = {
        preload:function(){
            content = "";            
            if(variables.userData){
                if(variables.userData.googleID != null){
                    content = `Google id: ${variables.userData.googleID},\nNombre: ${variables.userData.name}`;
                    this.game.load.baseURL = variables.userData.userPhoto;
                    this.game.load.crossOrigin = 'anonymous';
                    this.game.load.image('userPhoto', variables.userData.userPhoto);
                }else if(variables.userData.githubID != null){
                    content = `Github id: ${variables.userData.githubID},\nNombre: ${variables.userData.name}`;
                    this.game.load.baseURL = variables.userData.userPhoto;
                    this.game.load.crossOrigin = 'anonymous';
                    this.game.load.image('userPhoto', variables.userData.userPhoto);                    
                }                             
                

            }else{
                
            }
         
                     
        },
        create:function(){
            let imgProfile = this.game.add.sprite(200, 200, 'userPhoto');
            imgProfile.width = 200;
            imgProfile.height = 200;
            text = this.game.add.text(500, 200, '', { font: "15px Arial", fill: "#19de65" });

            nextLine();
        }
             
}

function nextLine() {

    if (lineIndex === content.length)
    {
        return;
    }

    line = content[lineIndex].split(' ');

    wordIndex = 0;

    variables.Game.time.events.repeat(wordDelay, line.length, nextWord, this);

    lineIndex++;

}

function nextWord() {

    text.text = text.text.concat(line[wordIndex] + " ");


    wordIndex++;

    if (wordIndex === line.length)
    {
        text.text = text.text.concat("");
        variables.Game.time.events.add(lineDelay, nextLine, this);
    }

}
