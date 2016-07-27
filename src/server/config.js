const production = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

// DEV: secrets in some JSON file, TODO: add one
// PRODUCTION: secrets from environment variables
// see: https://github.com/este/este/blob/master/src/server/config.js

const locales = ['en', 'sk'];

export default {
  appName: 'reactizer',
  production,
  defaultLocale: 'en',
  locales,
  port,
  portDev: 8080,
};
