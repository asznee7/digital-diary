'use strict'

const { app: logger } = require('../utils/logger')
const config = require('config')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const initializerMiddlewares = (app) => {
  const { limit, extended } = config.get('express')
  logger.info('initializerMiddlewares %j', {limit})

  app.use(bodyParser.urlencoded({
    limit: limit,
    extended: extended
  }))
  app.use(cors())

  app.route = express.Router()
  app.use(app.route)

  logger.info('initializerMiddlewares -> done')
}

module.exports = initializerMiddlewares
