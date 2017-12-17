/** 
*@file Class ches with her constructor and methods
*@author Alexander Quintana Díaz
*@class
*@classdesc this class create a new object chest in phaser game
*/
class Chest{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {Object} game 
     */
    constructor(x, y, game){
        this.chest = game.add.sprite(x, y, 'chest');
        this.chest.anchor.setTo(1);
        this.chest.scale.setTo(1.5);
        game.physics.arcade.enable(this.chest);
        this.chest.body.collideWorldBounds = true;        
        this.chest.spawnloot = ['powerpotion','manapotion','lifepotion'];        
    }
    /**
     * @method spawn
     * @return {number} item
     * @description generate random number and select 1, 2 or 3
     */
    spawn(){
        let number = Math.floor((Math.random() * 500) + 1);
        let item;        
        if(number > 1 && number < 25){
            item = 0;
        }else if(number > 24 && number < 300){
            item = 1;
        }else if(number > 299 && number < 501){
            item = 2;
        }        
        return item;
    }
   /**
    * @method selectItem
    * @description return one of attributes of this object in spawn
    * @return {string}
    */
    selectItem(){
        return this.chest.spawnloot[this.spawn()];
    }
}