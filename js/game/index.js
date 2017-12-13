window.onload = function()
{
    var game = new Phaser.Game("99%","99%",Phaser.CANVAS,'game');

    game.state.add('Boot',Game.Boot);
    game.state.add('Preloader',Game.Preloader);
    game.state.add('MainMenu', Game.MainMenu);
    game.state.add('Sigin', Game.Sigin);
    game.state.add('Login', Game.Login);
    
    game.state.add('Level1', Game.Level1);
    game.state.add('Admin', Game.Admin);
    game.state.add('DelUsers', Game.DelUsers);
    game.state.add('ConsultScores', Game.ConsultScores);
    game.state.add('DelMatchs', Game.DelMatchs);
    game.state.add('ListUsers', Game.ListUsers);
    

    game.state.start('Boot');
    
};