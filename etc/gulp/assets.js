import gulp from 'gulp';
import plumber from 'gulp-plumber';

import config from '../../packages/reactizer-web/etc/config';

const statics = () =>
  gulp.src([
    './src/browser/assets/**',
    '!./**/sprites/**',
    '!./**/sprites', // fixes copying empty 'sprites' folder
  ], { base: './src/browser/assets' })
    .pipe(plumber())
    .pipe(gulp.dest(`${config.output}/static`));

const locales = () =>
  gulp.src('./locales/**', { base: '.' })
    .pipe(plumber())
    .pipe(gulp.dest(config.output));

export default gulp.series(statics, locales);
