import { Sequelize } from 'sequelize';
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
export const Database = new Sequelize(config.database, config.username, config.password, config);
