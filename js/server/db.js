import {config} from 'dotenv';
config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.userPostgress}:${process.env.serverPostgressKey}@horton.elephantsql.com:5432/${process.env.userPostgress}`);

module.exports = sequelize;