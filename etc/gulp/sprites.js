import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import mergestream from 'merge-stream';

function sprites() {
  const spriteData = gulp.src('./src/browser/assets/sprites/*')
    .pipe(plumber())
    .pipe(spritesmith({
      imgPath: '../assets/images/sprite.png',
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
    }));

  const imgStream = spriteData.img
    .pipe(gulp.dest('./src/browser/assets/images'));

  const cssStream = spriteData.css
    .pipe(gulp.dest('./src/browser/css/core'));

  return mergestream(imgStream, cssStream);
}

export default sprites;
