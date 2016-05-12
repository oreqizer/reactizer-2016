import { join } from 'path';
import { readJsonSync } from 'fs-extra';
import nconf from 'nconf';

const appName = readJsonSync(join(__dirname, '../../package.json')).name;

// "foo__bar=lol <command>" becomes "{foo: {bar: 'lol'}}" here
nconf.env('__');

// allow command-line args
nconf.argv();

const production = process.env.NODE_ENV === 'production';
const output = process.env.OUTPUT_DIR;

// DEV: secrets in some JSON file, TODO: add one
// PRODUCTION: secrets from environment variables
// see: https://github.com/este/este/blob/master/src/server/config.js

nconf.defaults({
  production,
  output,
  appName,
  defaultLocale: 'en',
  googleAnalyticsId: 'UA-XXXXXXX-X',
  locales: ['en'],
  port: 3000,
  portDev: 8080,
});

export default nconf.get();
