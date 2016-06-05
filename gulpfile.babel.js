import gulp from 'gulp';

import config from './etc/config';
import nodeShell from './etc/tools/nodeShell';

import assetsTask from './etc/gulp/assets';
import buildTask from './etc/gulp/build';
import cleanTask from './etc/gulp/clean';
import lintTask from './etc/gulp/lint';
import * as nativeTasks from './etc/gulp/native';
import * as testTasks from './etc/gulp/tests';

export const ios = nativeTasks.ios;
export const android = nativeTasks.android;
export const native = nativeTasks.native;

export const test = testTasks.test;

export const assets = assetsTask;
export const build = buildTask;
export const clean = cleanTask;
export const lint = lintTask;

// ----------
// core tasks
// ----------

// prepares and builds all necessary files
export const bundle = gulp.series(clean, assets, build);

// beta/production server
export const server = nodeShell(
  `node ${config.output}/server/server.js --color`, { raw: true }
);

// bundles everything and then runs the server
export const run = gulp.series(bundle, server);

// dev server
export default nodeShell(
  'nodemon --exec ./node_modules/.bin/babel-node ./etc/server.dev.js --color'
);
