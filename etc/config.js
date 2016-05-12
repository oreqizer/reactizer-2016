import nconf from 'nconf';

const OUTPUTS = {
  TMP: '.tmp',
  DIST: 'dist',
};

// constant values
nconf.overrides(OUTPUTS);

// allow command-line args
nconf.argv();

const production = nconf.get('production');

// set ENV for Node here - webpack sets it for itself
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = production ? 'production' : 'dev';
}

const output = production ? OUTPUTS.DIST : OUTPUTS.TMP;

// set output directory for servers
process.env.OUTPUT_DIR = output;

nconf.defaults({
  production,
  output,
});

export default nconf.get();
