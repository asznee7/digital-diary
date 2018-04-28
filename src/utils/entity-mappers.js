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
  mapList
}
