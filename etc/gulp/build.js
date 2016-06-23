import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import webpack from 'webpack';

import config from '../config';
import buildConfig from '../webpack/webpack.build';

const buildServer = () =>
  gulp.src([
    './src/**/*.{js,jsx}',
    '!./src/native/**',
    '!./**/__tests__/**',
  ])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(config.output));

const buildBrowser = cb =>
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
  });

export default gulp.series(buildServer, buildBrowser);
