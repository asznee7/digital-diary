'use strict'

const sequelize = require('../utils/sequelize')
const {User, Subject, Class, Student, Teacher} = require('../models')
const config = require('config').get('database.seed')
const configSecurity = require('config').get('security')
const Chance = require('chance')
const bcrypt = require('bcrypt')
const { app: logger } = require('../utils/logger')
const { pepperAdd } = require('../utils/security')

const initializerSeed = async () => {
  logger.info('initializerSeed')

  const usersNum = await User.count()
  if (usersNum) {
    logger.info('initializerSeed -> seed executed earlier')
    return
  }

  await sequelize.transaction(async (transaction) => {
    const subjects = []
    let initSubjects = config.inits.subjects
    for (let i = 0; i < initSubjects.length; i++) {
      const subject = await Subject.create({
        name: initSubjects[i]
      }, { transaction })
      subjects.push(subject)
    }

    const classes = []
    let initClasses = config.inits.classes
    for (let i = 0; i < initClasses.length; i++) {
      const tclass = await Class.create({
        name: initClasses[i]
      }, { transaction })
      classes.push(tclass)
    }

    const chance = new Chance()
    const users = []
    const teachers = []
    const students = []
    let initUsers = config.inits.users
    for (let i = 0; i < initUsers.length; i++) {
      const user = await User.create({
        name: initUsers[i].name,
        password: bcrypt.hashSync(pepperAdd(initUsers[i].password), configSecurity.saltRounds),
        address: chance.address(),
        phone: chance.phone()
      }, {transaction})
      users.push(user)

      if (i < 5) {
        let teacher = Teacher.build({})
        teacher.setUser(user, { save: false })
        await teacher.save({ transaction })
        teachers.push(teacher)
      } else {
        let student = Student.build({})
        student.setUser(user, { save: false })
        await student.save({ transaction })
        students.push(student)
      }
    }
  })

  const subjects = await Subject.findAll()
  const teachers = await Teacher.findAll()
  const classes = await Class.findAll()
  const students = await Student.findAll()

  for (let i = 0; i < teachers.length; i++) {
    if (subjects.length > i) {
      await subjects[i].setTeachers(teachers[i])
    }
    if (classes.length > i) {
      await teachers[i].setClasses(classes[i])
    }
  }

  if (classes.length <= students.length) {
    let i, j, k, temparray
    let chunk = Math.round(students.length / classes.length)
    for (i = 0, j = students.length, k = 0; i < j; i += chunk, k++) {
      temparray = students.slice(i, i + chunk)
      await classes[k].setStudents(temparray)
    }
  }

  logger.info('initializerSeed -> done')
}

module.exports = initializerSeed
