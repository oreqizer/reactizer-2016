import { join } from 'path';
import { readJsonSync } from 'fs-extra';
import nconf from 'nconf';

const dev = process.env.NODE_ENV === 'dev';
const production = process.env.NODE_ENV === 'production';

const appName = readJsonSync(join(__dirname, '../package.json')).name;

// constant values
nconf.overrides({
  TMP: '.tmp',
  DIST: 'dist',
});

// "foo__bar=lol <command>" becomes "{foo: {bar: 'lol'}}" here
nconf.env('__');

// allow command-line args
nconf.argv();

// DEV: secrets in some JSON file, TODO: add one
// PRODUCTION: secrets from environment variables
// see: https://github.com/este/este/blob/master/src/server/config.js

nconf.defaults({
  dev,
  production,
  appName,
  defaultLocale: 'en',
  googleAnalyticsId: 'UA-XXXXXXX-X',
  locales: ['cs', 'de', 'es', 'en', 'fr', 'no', 'pt', 'ro'],
  port: 3000,
  port_dev: 8080,
});

export default nconf.get();
