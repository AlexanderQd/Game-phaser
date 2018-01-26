/**
 * @author Alexander Quintana Diaz
 * @function
 * @description anonimous function execute when index.html is open, then create objec game and add stats him
 */
window.onload = function()
{
    var game = new Phaser.Game("99%","99%",Phaser.CANVAS,'game');

    game.state.add('Boot',Game.Boot);
    game.state.add('Preloader',Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('Sigin', Game.Sigin);
    game.state.add('Login', Game.Login);
    game.state.add('SelectChar', Game.SelectChar);
    game.state.add('Level1', Game.Level1);
    game.state.add('Admin', Game.Admin);
    game.state.add('Profile', Game.Profile);
    game.state.add('Profile', Game.Profile);
    game.state.add('DelUsers', Game.DelUsers);
    game.state.add('ConsultScores', Game.ConsultScores);    
    game.state.add('ListUsers', Game.ListUsers);
    

    game.state.start('Boot');
    
};