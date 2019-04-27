const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
const path = require('path');

module.exports = withTypescript(
  withCSS({
    webpack(config) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.alias['@app'] = path.resolve('./');
      return config;
    },
  }),
);
