import { outputJsonSync } from 'fs-extra';
import { transform } from 'babel-core';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import through from 'through2';
import mergestream from 'merge-stream';

import config from '../config';

const statics = () =>
  gulp.src([
    './src/browser/assets/**',
    '!./**/sprites/**',
    '!./**/sprites', // fixes copying empty 'sprites' folder
  ], { base: './src/browser/assets' })
    .pipe(plumber())
    .pipe(gulp.dest(config.output));

const sprites = () => {
  const spriteData = gulp.src('./src/browser/assets/sprites/*')
    .pipe(plumber())
    .pipe(spritesmith({
      imgPath: '../assets/images/sprite.png',
      imgName: 'sprite.png',
      cssName: 'sprite.styl',
    }));

  const imgStream = spriteData.img
    .pipe(gulp.dest('./src/browser/assets/images'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('./src/browser/css/core'));

  return mergestream(imgStream, cssStream);
};

const messages = () => {
  let msgs = [];

  const getMessages = code => transform(code, {
    presets: ['react', 'es2015', 'stage-1'],
    plugins: ['react-intl', 'transform-decorators-legacy'],
  }).metadata['react-intl'].messages;

  return gulp.src('./src/**/*.{js,jsx}')
    .pipe(plumber())
    .pipe(through.obj((file, enc, cb) => {
      msgs = msgs.concat(getMessages(file.contents.toString()));
      cb();
    }))
    .on('end', () => {
      msgs.sort((a, b) => a.id.localeCompare(b.id));
      outputJsonSync('./data/locales/_default.json', msgs, { spaces: 2 });
    });
};

export default gulp.series(sprites, gulp.parallel(statics, messages));
