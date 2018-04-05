'use strict';

const Sequelize = require('sequelize');
const config = require('../config');

module.exports = new Sequelize(config.database.name, config.database.username, config.database.password, config.database.options);