import Sequelize from 'sequelize';
import sequelize from '../db';
import Match from './match';
import Score from './scores';
import bcrypt from "bcryptjs";

const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING(20),      
    },
    password: {
      type: Sequelize.STRING(80),      
    },
    email: {
      type: Sequelize.STRING(40),      
    },
    facebookID: {
      type: Sequelize.STRING(50),  
    },
    googleID: {
      type: Sequelize.STRING(50),  
    },
    userPhoto: {
      type: Sequelize.STRING(500),
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