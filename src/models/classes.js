'use strict';

const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');
const Student = require('./students');

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

const Class = sequelize.define('Class', schema, options);
Class.hasMany(Student);

module.exports = Class;