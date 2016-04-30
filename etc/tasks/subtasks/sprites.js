import path from 'path';
import spritesmith from 'spritesmith'; // TODO: pngjs2 upgrade

import logger from '../../tools/logger';

export default function (dest) {
  const sprites = path.join(__dirname, './../../../client/assets/sprites/*');

  return new Promise((resolve, reject) => {
    spritesmith.run([sprites], (err, res) => {
      if (err) {
        logger.error('Sprites: error:', err);
        reject(err);
      } else {
        logger.info(res);
        resolve(res);
      }
    });
  });
}



