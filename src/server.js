'use strict'

const path = require('path')
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'config')

const Express = require('express')
const config = require('config')
const {
  initializerSequelize,
  initializerModels,
  initializerSeed
} = require('./initializers')

const main = async () => {
  console.log('main')

  const { port } = config.get('express')

  const app = new Express()

  await initializerSequelize()
  await initializerModels()
  await initializerSeed()

  await new Promise((resolve, reject) => app
    .listen(port, resolve)
    .on('error', reject))

  console.log('main -> done')
}

main().catch(console.error)
