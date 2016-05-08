import { outputJsonSync } from 'fs-extra';
import gulp from 'gulp';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import webpack from 'webpack';
import shell from 'shelljs';
import * as babel from 'babel-core';
import through from 'through2';

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

gulp.task('start', ['assets'], cb => {
  const child = shell
    .exec(`${NODEMON} --exec ${BABEL} ./src/server/server.dev.js --color`, {
      async: true,
    });

  child.on('close', cb);
});

gulp.task('messages', ['clean:data'], () => {
  let messages = [];

  const getMessages = code => babel.transform(code, {
    presets: ['react', 'es2015', 'stage-1'],
    plugins: ['react-intl', 'transform-decorators-legacy'],
  }).metadata['react-intl'].messages;

  return gulp.src('./src/**/*.{js,jsx}')
    .pipe(through.obj((file, enc, cb) => {
      messages = messages.concat(getMessages(file.contents.toString()));
      cb();
    }))
    .on('end', () => {
      messages.sort((a, b) => a.id.localeCompare(b.id));
      outputJsonSync('./data/locales/_default.json', messages, { spaces: 2 });
    });
});

const ASSETS = [
  './src/browser/assets/**/*',
  '!./src/browser/assets/sprites',
  '!./src/browser/assets/sprites/*',
];

gulp.task('assets', ['clean'], () =>
  gulp.src(ASSETS, { base: './src/browser/assets' })
    .pipe(gulp.dest(config.output)));

gulp.task('clean', () =>
  gulp.src([`${config.output}/*`])
    .pipe(clean()));

gulp.task('clean:all', () =>
  gulp.src([`${config.TMP}/*`, `${config.DIST}/*`])
    .pipe(clean()));

gulp.task('default', ['start']);
