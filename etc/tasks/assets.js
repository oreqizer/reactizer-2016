import { join } from 'path';
import { copySync, emptyDirSync } from 'fs-extra';

import logger from './../tools/logger';

export default function (dest) {
  const home = join(__dirname, '../../');

  try {
    emptyDirSync(join(home, dest));
    copySync(join(home, 'src/client/assets/images'), join(home, dest, 'images'));

    logger.info('Copied and processed all assets');
  } catch (err) {
    logger.error('Processing assets failed', err);
  }
}
