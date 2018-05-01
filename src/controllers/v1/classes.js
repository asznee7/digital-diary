'use strict'

const express = require('express')
const { Class, Student, User } = require('../../models')
const { mapList, mapClassCore, mapClassExtended } = require('../../utils/entity-mappers')
const { database: databaseLogger } = require('../../utils/logger')
const { NotFoundError } = require('../../errors')
const { validateMiddleware, asyncMiddleware, checkAuthenticated } = require('../../utils/middlewares')

const router = new express.Router()

router.get('/',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const classes = await Class.findAndCountAll()
      .catch(err => databaseLogger.error('Uncaught exception: %s', err))

    const classesFormatted = mapList(mapClassCore)(classes)
    res.json(classesFormatted)
  })
)

router.get('/:id(\\d+)',
  checkAuthenticated(),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async (req, res) => {
    const classEntity = await Class.findById(req.params.id, {
      include: [
        { model: Student,
          include: [
            { model: User },
            { model: Class }
          ]
        }
      ]
    })
    if (!classEntity) {
      throw new NotFoundError(`Class ${req.params.id} not found`)
    }
    const classFormatted = mapClassExtended(classEntity)
    res.json(classFormatted)
  })
)

module.exports = router
