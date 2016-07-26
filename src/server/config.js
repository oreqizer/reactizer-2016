import { join } from 'path';
import { readJsonSync } from 'fs-extra';

const appName = readJsonSync(join(__dirname, '../../package.json')).name;

const production = process.env.NODE_ENV === 'production';
const output = process.env.OUTPUT_DIR;
const port = process.env.PORT || 3000;

// DEV: secrets in some JSON file, TODO: add one
// PRODUCTION: secrets from environment variables
// see: https://github.com/este/este/blob/master/src/server/config.js

export default {
  production,
  output,
  appName,
  defaultLocale: 'en',
  locales: ['en', 'sk'],
  port,
  portDev: 8080,
};
