import { outputJsonSync } from 'fs-extra';
import { transform } from 'babel-core';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import through from 'through2';

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

export default messages;
