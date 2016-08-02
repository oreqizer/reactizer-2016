require('babel-polyfill');
require('babel-register')({
  sourceMaps: true,
});

require('./server.dev');
