import Sequelize from 'sequelize';
import sequelize from './db';

const Maps = sequelize.define('map', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numberEnemies: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10
    }
  });

module.exports = Maps;