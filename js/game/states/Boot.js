/**
 * @author Alexander Quintana Diaz
 * @class
 */
var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
    init:function(){
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    },
    preload:function(){
        variables.Game = this;
    },

    create:function(){
        this.state.start('Preloader');
    }
}