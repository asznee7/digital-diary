'use strict'

const express = require('express')
const { Teacher, User, Subject, Class } = require('../../models')
const { mapList, mapTeacherCore } = require('../../utils/entity-mappers')
const { database: databaseLogger } = require('../../utils/logger')

const router = new express.Router()

router.get('/', async (req, res) => {
  const teachers = await Teacher.findAndCountAll({
    include: [
      {model: User},
      {model: Subject},
      {model: Class}
    ],
    distinct: true
  }).catch(err => databaseLogger.error('Uncaught exception: %s', err))

  const teachersFormatted = mapList(mapTeacherCore)(teachers)
  res.json(teachersFormatted)
})

router.get('/:id(\\d+)', async (req, res) => {

})

module.exports = router
