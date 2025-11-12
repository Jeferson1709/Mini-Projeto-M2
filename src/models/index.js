'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const sequelize = new Sequelize(config);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Tarefa = require('./tarefa')(sequelize, Sequelize);

module.exports = db;
