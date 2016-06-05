import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rimraf from 'gulp-rimraf';

import config from '../config';

const clean = () =>
  gulp.src([`${config.TMP}/*`, `${config.DIST}/*`], { read: false })
    .pipe(plumber())
    .pipe(rimraf());

export default clean;
