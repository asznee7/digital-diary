'use strict'

const initializerModels = require('./models')
const initializerSequelize = require('./sequelize')
const initializerSeed = require('./seed')
const initializerMiddlewares = require('./middlewares')
const initializerRoutes = require('./routes')

module.exports = {
  initializerSequelize,
  initializerModels,
  initializerSeed,
  initializerMiddlewares,
  initializerRoutes
}
