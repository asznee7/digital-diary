'use strict'

const express = require('express')
const { asyncMiddleware, validateMiddleware, checkAuthenticated } = require('../../utils/middlewares')
const { Subject, Mark, Teacher, Student, User, Class } = require('../../models')
const { mapList, mapMarkCore } = require('../../utils/entity-mappers')
const { NotFoundError } = require('../../errors')

const router = new express.Router()

router.get('/',
  checkAuthenticated(),
  validateMiddleware('emptySchema'),
  asyncMiddleware(async (req, res) => {
    const marks = await Mark.findAndCountAll({
      include: [
        { model: Subject },
        { model: Student,
          include: [
            { model: User },
            { model: Class }
          ]}
      ]
    })
    let marksFormatted = mapList(mapMarkCore)(marks)
    res.json(marksFormatted)
  })
)

router.get('/:id(\\d+)',
  checkAuthenticated(),
  validateMiddleware('emptySchemaWithId'),
  asyncMiddleware(async (req, res) => {
    const mark = await Mark.findById(req.params.id, {
      include: [
        { model: Subject },
        { model: Student,
          include: [
            { model: User },
            { model: Class }
          ]}
      ]
    })
    if (!mark) {
      throw new NotFoundError(`Mark ${req.params.id} not found`)
    }
    let markFormatted = mapMarkCore(mark)
    res.json(markFormatted)
  })
)

router.post('/',
  checkAuthenticated([ Teacher ]),
  validateMiddleware('markCreate'),
  asyncMiddleware(async ({ body: markData, authenticatedUser }, res) => {
    const student = await Student.findById(markData.student_id, {
      include: [
        { model: User },
        { model: Class }
      ]
    })
    if (!student) {
      throw new NotFoundError(`Student ${markData.student_id} not found`)
    }
    const subject = await Subject.findById(authenticatedUser.subject_id)
    const mark = await Mark.create({
      teacher_id: authenticatedUser.id,
      subject_id: authenticatedUser.subject_id,
      ...markData
    })
    const markFormatted = mapMarkCore({ ...mark.get(), Student: student, Subject: subject })
    res.json(markFormatted)
  })
)

router.put('/:id(\\d+)',
  checkAuthenticated([ Teacher ]),
  validateMiddleware('markUpdate'),
  asyncMiddleware(async (req, res) => {
    const markUpdated = await Mark.update(
      { value: req.body.value },
      { where: {id: req.params.id} }
    )
    if (!markUpdated[0]) {
      throw new NotFoundError(`Mark ${req.params.id} not found`)
    }
    const mark = await Mark.findById(req.params.id, {
      include: [
        { model: Subject },
        { model: Student,
          include: [
            { model: User },
            { model: Class }
          ]}
      ]
    })
    let markFormatted = mapMarkCore(mark)
    res.json(markFormatted)
  })
)

module.exports = router
