import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rimraf from 'gulp-rimraf';

const clean = () =>
  gulp.src(['.tmp/*', 'dist/*'], { read: false })
    .pipe(plumber())
    .pipe(rimraf());

export default clean;
