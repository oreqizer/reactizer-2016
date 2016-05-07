import { join } from 'path';
import { readJsonSync } from 'fs-extra';

import logger from '../../../etc/tools/logger';

export default function (locale) {
  try {
    return readJsonSync(join(__dirname, '../../../../data/locales', `${locale}.json`));
  } catch (err) {
    logger.error('Loading locale failed', err);
    return null;
  }
}
