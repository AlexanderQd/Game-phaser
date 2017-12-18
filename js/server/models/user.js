import Sequelize from 'sequelize';
import sequelize from '../db';
import Match from './match';
import Score from './scores';
import bcrypt from "bcryptjs";

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(80),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(20),
      allowNull: false,
    }
  });
User.hasMany(Match,{as: 'matchs', foreignKey: 'user_id'});
User.hasOne(Score, {as:'score', foreignKey: 'user_id'});

//validate password
User.prototype.validPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

//Hooks
User.beforeCreate((user, options) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  return (user.password = hash);
});

User.beforeUpdate((user, options) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  return (user.password = hash);
});

module.exports = User;