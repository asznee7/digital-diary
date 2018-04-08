'use strict'

const sequelize = require('../utils/sequelize')

const User = require('./users')
const Class = require('./classes')
const Mark = require('./marks')

const schema = {}

const Teacher = sequelize.define('Teacher', schema)
Teacher.belongsTo(User)
Teacher.belongsToMany(Class, {through: 'TeacherClass'})
Teacher.hasMany(Mark)

module.exports = Teacher
