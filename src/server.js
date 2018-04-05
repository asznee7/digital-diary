'use strict';

const Express = require('express');
const config = require('./config');
const {
    initializerSequelize,
    initializerModels,
    initializerSeed
} = require('./initializers');

const main = async() => {
    console.log('main');

    const app = new Express();

    await initializerSequelize();
    await initializerModels();
    await initializerSeed();

    await new Promise((resolve, reject) => app
        .listen(config.port, resolve)
        .on('error', reject));

    console.log('main -> done');
};

main().catch(console.error);