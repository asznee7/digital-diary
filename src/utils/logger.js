'use strict'

const winston = require('winston')
const config = require('config').get('loggers')

const loggers = Object
  .entries(config)
  .reduce((a, [name, config]) => {
    a[name] = winston.createLogger(config)
    return a
  }, {})

module.exports = loggers
