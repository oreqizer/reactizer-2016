// require hook allows source maps
// opposed of babel-node
require('babel-polyfill');
require('babel-register')({
  sourceMaps: true,
});

require('./server.dev');
