import nconf from 'nconf';

const PRODUCTION = process.env.NODE_ENV === 'production';

nconf.env('__');

nconf.defaults({
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
