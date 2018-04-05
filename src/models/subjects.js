'use strict';

const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');
const Teacher = require('./teachers');
const Mark = require('./marks');

const schema = {
    name: {
        type: Sequelize.STRING
    }
};

const options = {
    indexes: [
        {
            fields: ['name']
        }
    ]
};

const Subject = sequelize.define('Subject', schema, options);
Subject.hasMany(Teacher);
Subject.hasMany(Mark);

module.exports = Subject;