import Sequelize from 'sequelize';
import sequelize from './db';
import Match from './match';

const Maps = sequelize.define('map', {
    name: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    demon_walk: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    demon_fly: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    demon_walk_sword: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    demon_walk_shield:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    demon_fly_sword: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    demon_fly_shield:{
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
Maps.hasMany(Match,{as: 'matchs', foreignKey: 'map_id'});
module.exports = Maps;