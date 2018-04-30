'use strict'

const Sequelize = require('sequelize')
const config = require('config').get('database.config')
const { database: logger } = require('../utils/logger')
config.options.logging = (msg) => logger.info(msg)

module.exports = new Sequelize(config.name, config.username, config.password, config.options)
