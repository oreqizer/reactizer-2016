import { appName, defaultLocale, locales } from '../config';

export default (async) (req, messages) => ({
  intl: {
    defaultLocale,
    locale: req.acceptsLanguages(locales) || defaultLocale,
    locales,
    initialNow: Date.now(),
    messages,
  },
  config: {
    appName,
  },
});
