import Sequelize from 'sequelize';
import sequelize from './db';

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });

module.exports = User;