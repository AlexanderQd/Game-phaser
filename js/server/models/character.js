import Sequelize from 'sequelize';
import sequelize from '../db';
import Match from './match';

const Character = sequelize.define('character', {
    name: {
      type: Sequelize.STRING(15),
      allowNull: false,      
    },
    description: {
      type: Sequelize.STRING(150),
      allowNull: false,     
    },
    attack: {
      type: Sequelize.INTEGER,
      allowNull: false,      
    },
    defense: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    health: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    velocity: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    jump: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mana:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    img_route:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    json_route:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Character;