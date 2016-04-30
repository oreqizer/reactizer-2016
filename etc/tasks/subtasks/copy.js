import path from 'path';
import shell from 'shelljs';

import logger from './../../tools/logger';

export default function (dest) {
  const src = path.join(__dirname, './../../../client/assets/*');
  const endpoint = path.join(__dirname, `./../../../${dest}`);

  return new Promise((resolve, reject) => {
    shell.exec(`cp -r ${src} ${endpoint}`, (code, out, err) => {
      if (code !== 0) {
        logger.error('Copy: error:', err);
        reject();
      } else {
        resolve();
      }
    });
  });
}
