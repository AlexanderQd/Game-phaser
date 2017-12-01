import Sequelize from 'sequelize';
import sequelize from './db';
import User from './user';

const Match = sequelize.define('match', {
    mapID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    playerID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userID: {
      type: Sequelize.INTEGER,
      allowNull: false,      
    },
    nivelPlayer: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    enemyState: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Alive'
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
});
Match.hasMany(User,{as: 'players', foreignKey:'MatchId'});
module.exports = Match;