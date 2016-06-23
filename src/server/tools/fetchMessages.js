import { join } from 'path';
import { readJsonSync } from 'fs-extra';

import logger from '../lib/logger';

function fetchLocale(locale) {
  return readJsonSync(join(__dirname, '../../../data/locales', `${locale}.json`))
    .reduce((acc, { defaultMessage, id }) => ({
      ...acc, [id]: defaultMessage,
    }), {});
}

export default function fetchMessages(locales) {
  try {
    return locales
      .reduce((acc, locale) => ({
        ...acc, [locale]: fetchLocale(locale),
      }), {});
  } catch (err) {
    logger.error('[fetchMessages] Loading locales failed', err);
    return null;
  }
}
