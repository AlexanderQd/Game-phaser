import Sequelize from 'sequelize';
import sequelize from '../db';
import Match from './match';
import Score from './scores';

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(15),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(20),
      allowNull: false,
    }
  });
User.hasMany(Match,{as: 'matchs', foreignKey: 'user_id'});
User.hasOne(Score, {as:'score', foreignKey: 'user_id'});
module.exports = User;