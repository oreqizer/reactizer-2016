import { join } from 'path';
import { readJsonSync } from 'fs-extra';

const buildConfig = readJsonSync(join(__dirname, '../build-config.json'));

const production = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

// DEV: secrets in some JSON file, TODO: add one
// PRODUCTION: secrets from environment variables
// see: https://github.com/este/este/blob/master/src/server/config.js

export default {
  ...buildConfig,
  production,
  defaultLocale: 'en',
  locales: ['en', 'sk'],
  port,
  portDev: 8080,
};
