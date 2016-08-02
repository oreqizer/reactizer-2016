// TODO: find a way to have sourcemaps with 'babel-node'
require('babel-polyfill');
require('babel-register')({
  sourceMaps: true,
});

require('./server.dev');
