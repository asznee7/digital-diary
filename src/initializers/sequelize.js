'use strict'

const sequelize = require('../utils/sequelize')
const { app: loggerApp, database: loggerDatabase } = require('../utils/logger')

const initializerSequelize = async () => {
  loggerApp.info('initializerSequelize')

  await sequelize.authenticate()
    .then(() => {
      loggerDatabase.info('Connection has been established successfully.')
    })
    .catch(err => {
      loggerDatabase.error('Unable to connect to the database: %j', err)
    })

  loggerApp.info('initializerSequelize -> done')
}

module.exports = initializerSequelize
