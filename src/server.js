'use strict'

const path = require('path')
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'config')

const Express = require('express')
const config = require('config')
const {
  initializerSequelize,
  initializerModels,
  initializerSeed,
  initializerMiddlewares,
  initializerRoutes
} = require('./initializers')
const { app: logger } = require('./utils/logger')

const main = async () => {
  const { port } = config.get('express')
  logger.info('main on %j', { port })

  const app = new Express()

  await initializerSequelize()
  await initializerModels()
  await initializerSeed()
  await initializerMiddlewares(app)
  await initializerRoutes(app)

  await new Promise((resolve, reject) => app
    .listen(port, resolve)
    .on('error', reject))

  logger.info('main -> done on %j', { port })
}

main().catch(err => logger.error('Uncaught exception %s', err))
