'use strict';

const initializerModels = require('./models');
const initializerSequelize = require('./sequelize');
const initializerSeed = require('./seed');

module.exports = {
    initializerSequelize,
    initializerModels,
    initializerSeed
};