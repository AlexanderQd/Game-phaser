/**
 * @author Alexander Quintana Diaz
 * @param {Object} game
 * @class
 * @classdesc this states represent page of consult scores in text
 */
Game.ConsultScores = function(game){
    
};
let scoresText = "";
    Game.ConsultScores.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
            this.load.image('buttonsMenu','../../../assets/button/button_main-menu.png');            
        },
        create:function(){            
            this.game.stage.setBackgroundColor(0x2d2d2d);
            let count = 0;
            let once = true;
            fetch('http://localhost:3000/getScores', {
                method: "GET",
                mode: "cors"                    
            }).then((res) => {                
               return res.json()                        
            }).then( response => {                
                response.items.sort((a , b) =>{
                    if(a.score < b.score){
                        return 1;
                    }
                    if(a.score > b.score){
                        return -1
                    }
                    return 0;
                });
                response.items.forEach(element => {
                    count++;                   
                    if(count <= 5){
                        
                        scoresText += element.name + " score: " + element.score + "\n";                        
                    }                    
                    if(count === 5 && once){
                        once = false;
                        createText(this.game);            
                    }else if(count === response.items.length && once){                        
                        once = false;
                        createText(this.game);   
                    }                     
                })
            }).then(count = 0, scoresText = "").catch(err => {
                conexionError()
            });
            this.add.button(this.world.centerX - 150, this.world.centerY + 200, 'buttonsMenu', () => {
                this.game.state.start('MainMenu')
            })
        }        
    }

    function createText(game) {
            
            scoreText = game.add.text(game.world.centerX + 50, game.world.centerY, scoresText);
            scoreText.anchor.setTo(0.5);           
            scoreText.font = 'Revalia';
            scoreText.fontSize = 60;
            
            //  x0, y0 - x1, y1
            let grd = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.width);
            grd.addColorStop(0, '#8ED6FF');   
            grd.addColorStop(1, '#004CB3');
            scoreText.fill = grd;
        
            scoreText.align = 'left';
            scoreText.stroke = '#000000';
            scoreText.strokeThickness = 2;
            scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
            scoreText.inputEnabled = true;
            scoreText.input.enableDrag();

}