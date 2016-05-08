import gulp from 'gulp';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import webpack from 'webpack';
import shell from 'shelljs';

import buildConfig from './etc/webpack/webpack.build';
import config from './etc/config';

const BABEL = './node_modules/.bin/babel-node';
const NODEMON = './node_modules/.bin/nodemon';

gulp.task('build', ['assets'], cb =>
  webpack(buildConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    }));

    cb();
  })
);

gulp.task('clean', () =>
  gulp.src([`${config.output}/*`])
    .pipe(clean()));

gulp.task('clean:all', () =>
  gulp.src([`${config.TMP}/*`, `${config.DIST}/*`])
    .pipe(clean()));

const ASSETS = [
  './src/browser/assets/**/*',
  '!./src/browser/assets/sprites',
  '!./src/browser/assets/sprites/*',
];

gulp.task('assets', ['clean'], () =>
  gulp.src(ASSETS, { base: './src/browser/assets' })
    .pipe(gulp.dest(config.output)));

gulp.task('start', cb => {
  const child = shell.exec('npm start', { async: true, stdio: 'inherit' });

  child.on('close', cb);
});

gulp.task('default', ['start']);
