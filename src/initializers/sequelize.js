'use strict';

const sequelize = require('../utils/sequelize');

const initializerSequelize = async() => {
    console.log('initializerSequelize');

    await sequelize.authenticate()
                    .then(() => {
                        console.log('Connection has been established successfully.');
                    })
                    .catch(err => {
                        console.error('Unable to connect to the database:', err);
                    });

    console.log('initializerSequelize -> done');
};

module.exports = initializerSequelize;