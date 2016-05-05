import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import shell from 'shelljs';
import yargs from 'yargs';

import devConfig from './etc/webpack/webpack.dev';
import buildConfig from './etc/webpack/webpack.build';

const args = yargs
  .alias('p', 'production')
  .alias('b', 'beta')
  .alias('d', 'dev')
  .argv;

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

gulp.task('server', () => shell.exec('npm start', { async: true }));

gulp.task('default', ['server']);
