import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import shell from 'shelljs';

import buildConfig from './etc/webpack/webpack.build';
import config from './etc/config';

const BABEL = './node_modules/.bin/babel-node';
const NODEMON = './node_modules/.bin/nodemon';

gulp.task('build', cb =>
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

gulp.task('start', () =>
  shell.exec('npm start', { async: true }));

gulp.task('default', ['start']);
