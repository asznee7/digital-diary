'use strict'

const { FORBIDDEN } = require('http-status')

const AbstractError = require('./abstract-error')

class ForbiddenError extends AbstractError {
  constructor (message) {
    super(message)

    this.status = FORBIDDEN
  }
}

module.exports = ForbiddenError
