import gulp from 'gulp';

import assets from './etc/gulp/assets';
import build from './etc/gulp/build';
import clean from './etc/gulp/clean';
import messages from './etc/gulp/messages';
import sprites from './etc/gulp/sprites';

// --------
// subtasks
// --------

export {
  assets,
  build,
  clean,
  messages,
  sprites,
};

// ----------
// core tasks
// ----------

// prepares all data for the web app
export const prepare = gulp.series(clean, sprites, assets);

// prepares and builds the web app
export const bundle = gulp.series(prepare, build);

// watch browser asset changes
export default gulp.series(prepare, () =>
  gulp.watch([
    './src/browser/assets/**',
    '!./src/browser/assets/sprites/**',
  ], assets));
