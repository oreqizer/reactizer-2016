import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import mergestream from 'merge-stream';

import config from '../config';

const statics = () =>
  gulp.src([
    './src/browser/assets/**',
    '!./**/sprites/**',
    '!./**/sprites', // fixes copying empty 'sprites' folder
  ], { base: './src/browser/assets' })
    .pipe(plumber())
    .pipe(gulp.dest(`${config.output}/static`));

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

export default gulp.series(sprites, statics);
