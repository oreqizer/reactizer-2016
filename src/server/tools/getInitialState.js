import { appName, defaultLocale, locales } from '../config';

const getInitialState = (req, messages) => ({
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

export default getInitialState;
