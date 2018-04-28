'use strict'

const express = require('express')
const { Teacher, User, Subject, Class } = require('../../models')
const { mapList, mapTeacherCore, mapTeacherExtended } = require('../../utils/entity-mappers')
const { database: databaseLogger } = require('../../utils/logger')
const { NotFoundError } = require('../../errors')

const router = new express.Router()

router.get('/', async (req, res) => {
  const teachers = await Teacher.findAndCountAll({
    include: [
      {model: User},
      {model: Subject}
    ],
    distinct: true
  }).catch(err => databaseLogger.error('Uncaught exception: %s', err))

  const teachersFormatted = mapList(mapTeacherCore)(teachers)
  res.json(teachersFormatted)
})

router.get('/:id(\\d+)', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id, {
    include: [
      { model: User },
      { model: Subject },
      { model: Class }
    ]
  })
  if (!teacher) {
    throw new NotFoundError(`Teacher ${req.params.id} not found`)
  }

  const teacherFormatted = mapTeacherExtended(teacher)
  res.json(teacherFormatted)
})

module.exports = router
