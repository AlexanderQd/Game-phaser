import Sequelize from 'sequelize';
import sequelize from '../db';

const DemonWalk = sequelize.define('demonwalk', {
    health: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100

    },
    speed: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100
    },
    defense: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    attack: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5
    }
  });

module.exports = DemonWalk;