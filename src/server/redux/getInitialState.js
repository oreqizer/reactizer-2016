import fetchMessages from '../tools/fetchMessages';
import matchLocale from '../tools/matchLocale';

import { appName, defaultLocale, locales } from './../config';

export default function getInitialState(req) {
  const locale = matchLocale(req);
  const { refreshToken } = req.cookies.refreshToken;

  // TODO: add a function that fetches user data if 'refreshToken'

  return {
    intl: {
      defaultLocale,
      locale,
      locales,
      initialNow: Date.now(),
      messages: fetchMessages(locale),
    },
    config: {
      appName,
    },
    user: {
      refreshToken,
    },
  };
}
