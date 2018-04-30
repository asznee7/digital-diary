'use strict'

const { app: logger } = require('../utils/logger')
const config = require('config')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const { errorHandler, notFoundHandler } = require('../utils/middlewares')
const cookieParser = require('cookie-parser')

const initializerMiddlewares = (app) => {
  const { limit, extended } = config.get('express')
  logger.info('initializerMiddlewares %j', {limit})

  app.use(bodyParser.urlencoded({
    limit: limit,
    extended: extended
  }))
  app.use(cors())

  app.use(cookieParser())

  app.route = express.Router()
  app.use(app.route)

  app.use(notFoundHandler)
  app.use(errorHandler)

  logger.info('initializerMiddlewares -> done')
}

module.exports = initializerMiddlewares
