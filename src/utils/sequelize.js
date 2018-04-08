'use strict'

const Sequelize = require('sequelize')
const config = require('config').get('database').get('config')

module.exports = new Sequelize(config.name, config.username, config.password, config.options)
