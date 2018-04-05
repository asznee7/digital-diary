'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../utils/sequelize');

const schema = {
    name: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    }
};

const options = {
    indexes: [
        {
            fields: ['name']
        },
        {
            fields: ['phone']
        },
        {
            fields: ['username']
        }
    ]
};

const User = sequelize.define('User', schema, options);

module.exports = User;