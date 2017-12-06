Match.sync().then(()=>{
    Match.create({
        player_level: 1,
        enemy_state: 'Alive',
        score: 0,
    });
});


User.findAll({
    where: {
        name: {[sequelize.Op.ne]: null}
    }
}).then( users => {
users.forEach(user =>{
    user.destroy();
})
});