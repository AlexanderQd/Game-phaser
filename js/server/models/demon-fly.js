import Sequelize from 'sequelize';
import sequelize from '../db';

const DemonFly = sequelize.define('demon-fly', {
    health: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 150

    },
    speed: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 130
    },
    defense: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5
    },
    attack: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 15
    }
  });

module.exports = DemonFly;