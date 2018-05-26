'use strict'

const mapList = (mapEntityFn) => ({count, rows}) => ({
  count,
  entities: rows.map(mapEntityFn)
})

const mapUserCore = ({name}) => ({name})
const mapUserExtended = ({ name, address, phone }) => ({ name, address, phone })
const mapSubjectCore = ({id, name}) => ({id, name})
const mapClassCore = ({id, name}) => ({id, name})

const mapTeacherCore = ({id, User, Subject}) => ({
  id,
  ...mapUserCore(User),
  subject: mapSubjectCore(Subject)
})
const mapTeacherExtended = ({ id, User, Subject, Classes }) => ({
  id,
  ...mapUserExtended(User),
  subject: mapSubjectCore(Subject),
  classes: Classes.map(mapClassCore)
})

const mapStudentCore = ({id, User, Class}) => ({
  id,
  ...mapUserCore(User),
  class: mapClassCore(Class)
})
const mapStudentExtended = ({id, User, Class}) => ({
  id,
  ...mapUserExtended(User),
  class: mapClassCore(Class)
})

const mapClassExtended = ({ id, name, Students }) => {
  return ({
    id,
    name,
    students: Students.map(mapStudentCore)
  })
}

const dateFormat = require('dateformat')
const mapMarkCore = ({ id, value, created_at, Student, Subject }) => ({
  id,
  value,
  date: dateFormat(created_at, 'yyyy-mm-dd'),
  student: mapStudentCore(Student),
  class: mapClassCore(Student.Class),
  subject: mapSubjectCore(Subject)
})

const { Teacher, Student } = require('../models')
const config = require('config')
const { InternalServerError } = require('../errors')
const roles = config.get('security.roles')

const mapUserRole = (modelInstance) => {
  if (modelInstance instanceof Teacher) {
    return roles.teacher
  }
  if (modelInstance instanceof Student) {
    return roles.student
  }
  throw new InternalServerError('Unknown role')
}

const mapUserInfo = (modelInstance) => ({
  id: modelInstance.id,
  name: modelInstance.User.name,
  role: mapUserRole(modelInstance)
})

module.exports = {
  mapSubjectCore,
  mapClassCore,
  mapClassExtended,
  mapTeacherCore,
  mapTeacherExtended,
  mapUserCore,
  mapUserExtended,
  mapStudentCore,
  mapStudentExtended,
  mapList,
  mapUserRole,
  mapUserInfo,
  mapMarkCore
}
