'use strict';

const sequelize = require('../utils/sequelize');
const Sequelize = require('sequelize');

const schema = {
    value: {
        type: Sequelize.INTEGER
    }
};

const Mark = sequelize.define('Mark', schema);

module.exports = Mark;