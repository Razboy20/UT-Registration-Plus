/* eslint-disable global-require */
/** @type {import('postcss-load-config').Config} */
const config = {
    syntax: 'postcss-scss',
    plugins: [
        require('cssnano')({
            preset: 'advanced',
        }),
    ],
};

module.exports = config;
