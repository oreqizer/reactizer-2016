import { outputJsonSync } from 'fs-extra';
import { transform } from 'babel-core';
import gulp from 'gulp';
import gutil from 'gulp-util';
import babel from 'gulp-babel';
import rimraf from 'gulp-rimraf';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import webpack from 'webpack';
import through from 'through2';
import mergestream from 'merge-stream';

import buildConfig from './etc/webpack/webpack.build';
import config from './etc/config';

import nodeShell from './etc/utils/nodeShell';

gulp.task('default', ['start']);

const start = 'nodemon --exec ./node_modules/.bin/babel-node ./src/server/server.dev.js --color';
gulp.task('start', ['assets'], nodeShell(start));

const server = `node ${config.output}/server/server.js --color`;
gulp.task('server', ['build'], nodeShell(server, { raw: true }));

gulp.task('build', ['build:node', 'build:client']);

gulp.task('build:node', () =>
  gulp.src([
    './src/**/*.{js,jsx}',
    '!./src/native/**',
    '!./**/__tests__/**',
    '!./**/*.dev.*',
  ])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(config.output)));

gulp.task('build:client', ['assets'], cb =>
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

gulp.task('verify', ['test', 'lint']);

// ------
// native
// ------

const nativebase = 'node node_modules/react-native/local-cli/cli.js';
gulp.task('ios', nodeShell(`${nativebase} run-ios`, { raw: true }));

gulp.task('android', nodeShell(`${nativebase} run-android`, { raw: true }));

gulp.task('native', nodeShell(`${nativebase} start`, { raw: true }));

gulp.task('native:clean', nodeShell(`${nativebase} start --reset-cache`, { raw: true }));

// -----
// tests
// -----

gulp.task('test', ['lint'], nodeShell('jest --verbose'));

gulp.task('test:watch', ['lint'], nodeShell('jest --watch'));

// ------
// assets
// ------

gulp.task('messages', () => {
  let messages = [];

  const getMessages = code => transform(code, {
    presets: ['react', 'es2015', 'stage-1'],
    plugins: ['react-intl', 'transform-decorators-legacy'],
  }).metadata['react-intl'].messages;

  return gulp.src('./src/**/*.{js,jsx}')
    .pipe(plumber())
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

gulp.task('assets', ['sprites'], () =>
  gulp.src(ASSETS, { base: './src/browser/assets' })
    .pipe(plumber())
    .pipe(gulp.dest(config.output)));

// ----
// lint
// ----

const lintbase = 'eslint ./**/*.{js,jsx}';
gulp.task('lint', nodeShell(lintbase));

const lintfix = ' --fix';
gulp.task('lint:fix', nodeShell(lintbase + lintfix));

// --------
// subtasks
// --------

gulp.task('sprites', () => {
  const spriteData = gulp.src('./src/browser/assets/sprites/*')
    .pipe(plumber())
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.styl',
    }));

  const imgStream = spriteData.img
    .pipe(gulp.dest('./src/browser/assets/images'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('./src/browser/core/css'));

  return mergestream(imgStream, cssStream);
});

gulp.task('clean', () =>
  gulp.src(`${config.output}/**/*.*`, { read: false })
    .pipe(plumber())
    .pipe(rimraf()));

gulp.task('clean:all', () =>
  gulp.src([`${config.TMP}/**/*.*`, `${config.DIST}/**/*.*`], { read: false })
    .pipe(plumber())
    .pipe(rimraf()));
