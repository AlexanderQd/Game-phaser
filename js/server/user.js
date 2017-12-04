import Sequelize from 'sequelize';
import sequelize from './db';
import Match from './match';

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
User.hasMany(Match,{as: 'matchs', foreignKey: 'user_id'});
module.exports = User;