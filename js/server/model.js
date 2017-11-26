import Sequelize from 'sequelize';
import sequelize from './db';

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

module.exports = User;