import fetchMessages from '../tools/fetchMessages';
import matchLocale from '../tools/matchLocale';

import { appName, defaultLocale, locales } from '../config';

import logger from '../lib/logger';

import { refreshLogin } from '../../universal/redux/modules/user/userApi';
import { SUCCESS, ERROR } from '../../universal/consts/phaseConsts';

async function maybeLogin(refreshToken) {
  try {
    if (refreshToken) {
      const { data } = await refreshLogin(refreshToken);
      return { token: data.token, user: data.user, phase: SUCCESS };
    }

    return {};
  } catch (err) {
    logger.error('[getInitialState] Login failed', err);
    return { phase: ERROR, error: err.data };
  }
}

export default function getInitialState(req) {
  const locale = matchLocale(req);

  const { refreshToken } = req.cookies;
  const login = maybeLogin(refreshToken);

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
      ...login,
      refreshToken,
    },
  };
}
