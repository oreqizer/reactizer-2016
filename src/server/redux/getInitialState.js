import fetchMessages from '../tools/fetchMessages';
import matchLocale from '../tools/matchLocale';

import { refreshLogin } from '../../universal/redux/modules/user/userApi';

import { appName, defaultLocale, locales } from './../config';

async function maybeUser(refreshToken) {
  if (refreshToken) {
    return await refreshLogin(refreshToken);
  }

  return null;
}

export default function getInitialState(req) {
  const locale = matchLocale(req);

  const { refreshToken } = req.cookies;
  const user = maybeUser(refreshToken);

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
      user,
      refreshToken,
    },
  };
}
