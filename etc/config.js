import nconf from 'nconf';

const DEV = process.env.NODE_ENV === 'dev';
const PRODUCTION = process.env.NODE_ENV === 'production';

// "foo__bar=lol <command>" becomes "{foo: {bar: 'lol'}}" here
nconf.env('__');

// DEV: secrets in some JSON file, TODO: add one
// PRODUCTION: secrets from environment variables
// see: https://github.com/este/este/blob/master/src/server/config.js

nconf.defaults({
  DEV,
  PRODUCTION,
  DEFAULT_LOCALE: 'en',
  GOOGLE_ANALYTICS_ID: 'UA-XXXXXXX-X',
  LOCALES: ['cs', 'de', 'es', 'en', 'fr', 'no', 'pt', 'ro'],
  PORT: 3000,
  PORT_DEV: 8080,
});

// can be changed by args or env
const volatile = nconf.get();

// have to stay the same
const persistent = {
  TMP: '.tmp',
  DIST: 'dist',
};

export default {
  ...volatile,
  ...persistent,
};
