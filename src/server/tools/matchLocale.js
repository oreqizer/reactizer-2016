import { locales, defaultLocale } from '../config';

export default function (req) {
  if (req.cookies.locale) {
    return req.cookies.locale;
  }

  return req.acceptsLanguages(locales) || defaultLocale;
}
