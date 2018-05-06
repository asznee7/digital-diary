'use strict'

const sequelize = require('../utils/sequelize')
const { app: loggerApp, database: loggerDatabase } = require('../utils/logger')

const initializerModels = async () => {
  loggerApp.info('initializerModels')

  require('../models')
  await sequelize.sync()
    .catch(err => { loggerDatabase.error('Error syncing models %s', err) })

  loggerApp.info('initializerModels -> done')
}

module.exports = initializerModels
