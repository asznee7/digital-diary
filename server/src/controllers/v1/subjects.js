'use strict'

const express = require('express')
const { Subject } = require('../../models')
const { mapList, mapSubjectCore } = require('../../utils/entity-mappers')
const { database: databaseLogger } = require('../../utils/logger')
const { NotFoundError } = require('../../errors')
const { validateMiddleware, asyncMiddleware, checkAuthenticated } = require('../../utils/middlewares')

const router = new express.Router()

router.get('/',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const subjects = await Subject.findAndCountAll()
      .catch(err => databaseLogger.error('Uncaught exception: %s', err))

    const subjectsFormatted = mapList(mapSubjectCore)(subjects)
    res.json(subjectsFormatted)
  })
)

router.get('/:id(\\d+)',
  checkAuthenticated(),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async (req, res) => {
    const subject = await Subject.findById(req.params.id)
    if (!subject) {
      throw new NotFoundError(`Subject ${req.params.id} not found`)
    }
    const subjectFormatted = mapSubjectCore(subject)
    res.json(subjectFormatted)
  })
)

module.exports = router
