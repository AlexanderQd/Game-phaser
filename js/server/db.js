import {config} from 'dotenv';
config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.USER_POSTGRES}:${process.env.
SERVER_POSTGRESS_KEY}@horton.elephantsql.com:5432/${process.env.USER_POSTGRES}`);

module.exports = sequelize;