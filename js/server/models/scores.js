import Sequelize from 'sequelize';
import sequelize from '../db';


const Scores = sequelize.define('scores', {
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }
  });

module.exports = Scores;