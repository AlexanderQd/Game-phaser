import Sequelize from 'sequelize';
import sequelize from '../db';
import Match from './match';
import DemonWalk from './demon-walk';
import DemonFly from './demon-fly';

const Level1 = sequelize.define('Level1', {
    type: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    positionX: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    positionY: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });
Level1.hasMany(Match, {as: 'matchs', foreignKey: 'Level1_id'});
Level1.belongsToMany(DemonWalk, {as: 'demonswalk'});
Level1.belongsToMany(DemonFly, {as: 'demonsfly'});
module.exports = Level1;