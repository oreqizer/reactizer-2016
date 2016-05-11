import { join } from 'path';
import { readJsonSync } from 'fs-extra';
import nconf from 'nconf';

const appName = readJsonSync(join(__dirname, '../../package.json')).name;

const OUTPUTS = {
  TMP: '.tmp',
  DIST: 'dist',
};

// constant values
nconf.overrides(OUTPUTS);

// "foo__bar=lol <command>" becomes "{foo: {bar: 'lol'}}" here
nconf.env('__');

// allow command-line args
nconf.argv();

const production = nconf.get('production') || process.env.NODE_ENV === 'production';

// set ENV for Node here - webpack sets it for itself
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = production ? 'production' : 'dev';
}

const output = production ? OUTPUTS.DIST : OUTPUTS.TMP;

// DEV: secrets in some JSON file, TODO: add one
// PRODUCTION: secrets from environment variables
// see: https://github.com/este/este/blob/master/src/server/config.js

nconf.defaults({
  production,
  appName,
  output,
  defaultLocale: 'en',
  googleAnalyticsId: 'UA-XXXXXXX-X',
  locales: ['en'],
  port: 3000,
  portDev: 8080,
});

export default nconf.get();
