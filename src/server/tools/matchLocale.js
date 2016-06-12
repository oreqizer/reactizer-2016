import { locales, defaultLocale } from '../config';

import logger from '../lib/logger';

export default function (req) {
  if (req.cookies.locale) {
    logger.info(`[matchLocale] locale from cookies: ${req.cookies.locale}`);
    return req.cookies.locale;
  }

  logger.info('[matchLocale] matching best available locale...');
  return req.acceptsLanguages(locales) || defaultLocale;
}
