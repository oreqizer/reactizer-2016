import gulp from 'gulp';

import config from './etc/config';
import nodeShell from './etc/tools/nodeShell';

import assets from './etc/gulp/assets';
import build from './etc/gulp/build';
import clean from './etc/gulp/clean';
import messages from './etc/gulp/messages';
import { ios, android, native, nativeClean } from './etc/gulp/native';
import { lint, lintFix } from './etc/gulp/lint';
import { test, testCoverage, testWatch } from './etc/gulp/tests';

// --------
// subtasks
// --------

export {
  assets,
  build,
  clean,
  messages,
  native,
  nativeClean,
  test,
  testCoverage,
  testWatch,
  lint,
  lintFix,
};

// ----------
// core tasks
// ----------

// prepares and builds the web app
export const bundle = gulp.series(
  clean,
  gulp.parallel(assets, messages),
  build
);

// starts the beta/production server
export const server = nodeShell(
  `OUTPUT_DIR=${config.output} node ${config.output}/server/server.js --color`, { raw: true }
);

// bundles everything and then runs the server
export const run = gulp.series(bundle, server);

// dev native
export { ios, android };

// dev server
export default nodeShell(
  'nodemon --exec ./node_modules/.bin/babel-node ./etc/server.dev.js --color'
);
