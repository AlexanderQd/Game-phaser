import Sequelize from 'sequelize';
import sequelize from './db';

const Match = sequelize.define('match', {
    player_level: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    enemy_state: {
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


module.exports = Match;