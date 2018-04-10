'use strict'

const mapList = (mapEntityFn) => ({count, rows}) => ({
  count,
  entities: rows.map(mapEntityFn)
})

const mapTeacherCore = ({id, User, Subject, Classes}) => ({
  id,
  ...mapUserCore(User),
  subject: mapSubjectCore(Subject),
  classes: Classes.map(mapClassCore)
})

const mapUserCore = ({name, address, phone}) => ({name, address, phone})

const mapSubjectCore = ({id, name}) => ({id, name})

const mapClassCore = ({id, name}) => ({id, name})

module.exports = {
  mapSubjectCore,
  mapTeacherCore,
  mapUserCore,
  mapList
}
