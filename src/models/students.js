'use strict';

const sequelize = require('../utils/sequelize');

const User = require('./users');
const Mark = require('./marks');

const schema = {};

const Student = sequelize.define('Student', schema);
Student.belongsTo(User);
Student.hasMany(Mark);

module.exports = Student;