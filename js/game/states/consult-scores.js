Game.ConsultScores = function(game){
    
};
let count = 0;
let scoresText = "";
    Game.ConsultScores.prototype = {
        preload:function(){ 
        
            this.add.plugin(PhaserInput.Plugin);
            this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
           
        },
        create:function(){
            fetch('http://localhost:3000/getScores', {
                method: "GET",
                mode: "cors"                    
            }).then((res) => {                
               return res.json()                        
            }).then( response => {                
                response.items.forEach(element => {
                   
                    scoresText += element.name + " score: " + element.score + "\n";
                    count++;
                    if(count === response.items.length){
                        createText(this.game);
                        
                    }     
                });
                                       
            }); 
        }        
    }

    function createText(game) {
        
            scoreText = game.add.text(10,50, scoresText);
            scoreText.anchor.setTo(0.5);
        
            scoreText.font = 'Revalia';
            scoreText.fontSize = 60;
        
            //  x0, y0 - x1, y1
            let grd = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.height);
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