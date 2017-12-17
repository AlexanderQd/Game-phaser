import Sequelize from 'sequelize';
import sequelize from '../db';

const Match = sequelize.define('match', {
    player_level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    character_id: {
      type: Sequelize.STRING(3),      
    }
});


module.exports = Match;