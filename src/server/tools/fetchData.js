import { join } from 'path';
import { readJsonSync } from 'fs-extra';

import logger from '../lib/logger';

const fetchLocale = (locale, path) => readJsonSync(join(path, `${locale}.json`))
  .reduce((acc, { defaultMessage, id }) => ({
    ...acc, [id]: defaultMessage,
  }), {});

function fetchMessages(locales, path) {
  try {
    return locales
      .reduce((acc, locale) => ({
        ...acc, [locale]: fetchLocale(locale, path),
      }), {});
  } catch (err) {
    logger.error('[fetchData] Loading locales failed', err);
    return null;
  }
}

function fetchAssets(path) {
  try {
    return readJsonSync(path);
  } catch (err) {
    logger.error('[fetchData] Loading asset info failed', err);
    return null;
  }
}

export default options => ({
  locales: fetchMessages(options.locales, options.localesFolder),
  assets: fetchAssets(options.assetsFile),
});
