import path from 'path';

import logger from '../tools/logger';
import sprites from './subtasks/sprites';
import copy from './subtasks/copy';

export default async function (dest) {
  const promises = [];

  promises.push(sprites(dest));
  promises.push(copy(dest));

  try {
    await Promise.all(promises);

    logger.info('Copied and processed all assets');
  } catch (err) {
    logger.error('Processing assets failed', err);
  }
}
