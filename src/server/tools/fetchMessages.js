import { join } from 'path';
import { readJsonSync } from 'fs-extra';

import logger from '../lib/logger';

export default function (locale) {
  try {
    return readJsonSync(join(__dirname, '../../../data/locales', `${locale}.json`))
      .reduce((acc, { defaultMessage, id }) => ({
        ...acc, [id]: defaultMessage,
      }), {});
  } catch (err) {
    logger.error('Loading locale failed', err);
    return null;
  }
}
