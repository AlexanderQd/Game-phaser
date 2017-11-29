import Sequelize from 'sequelize';
import sequelize from './db';

const Enemie = sequelize.define('enemie', {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
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
        allowNull: false
    },
    attack: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pointX: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pointY: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  });

module.exports = Enemie;