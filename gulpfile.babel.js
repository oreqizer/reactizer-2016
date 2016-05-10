import { outputJsonSync } from 'fs-extra';
import gulp from 'gulp';
import gutil from 'gulp-util';
import clean from 'gulp-clean';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import webpack from 'webpack';
import * as babel from 'babel-core';
import through from 'through2';
import mergestream from 'merge-stream';

import buildConfig from './etc/webpack/webpack.build';
import config from './etc/config';

import nodeShell from './etc/utils/nodeShell';

gulp.task('default', ['start']);

const start = 'nodemon --exec ./node_modules/.bin/babel-node ./src/server/server.dev.js --color';
gulp.task('start', ['assets'], nodeShell(start));

gulp.task('server', ['build'], nodeShell('babel-node ./src/server/server.js'));

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

gulp.task('verify', ['test', 'lint', 'lint:tests']);

// -----
// tests
// -----

gulp.task('test', ['lint:tests'], nodeShell('jest --verbose'));

gulp.task('test:watch', ['lint:tests'], nodeShell('jest --watch'));

// ------
// assets
// ------

gulp.task('messages', () => {
  let messages = [];

  const getMessages = code => babel.transform(code, {
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

gulp.task('assets', ['clean', 'sprites'], () =>
  gulp.src(ASSETS, { base: './src/browser/assets' })
    .pipe(plumber())
    .pipe(gulp.dest(config.output)));

gulp.task('locales:default', ['messages'], () =>
  gulp.src('./data/locales/_default.json')
    .pipe(plumber())
    .pipe(rename('en.json'))
    .pipe(gulp.dest('./data/locales')));

// ----
// lint
// ----

const lintbase = 'eslint "./**/*.{js,jsx}"';
gulp.task('lint', nodeShell(lintbase));

const linttest = '--ignore-path "./etc/tests/.eslintignore" -c "./etc/tests/.eslintrc"';
gulp.task('lint:tests', nodeShell(lintbase + linttest));

const lintfix = '--fix';
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
  gulp.src([`${config.output}/*`])
    .pipe(plumber())
    .pipe(clean()));

gulp.task('clean:all', () =>
  gulp.src([`${config.TMP}/*`, `${config.DIST}/*`])
    .pipe(plumber())
    .pipe(clean()));
