import axios from 'axios';

import { appName, defaultLocale, locales } from '../config';
import logger from '../lib/logger';

import { URL } from '../../universal/consts/apiConsts';
import { REFRESH_TOKEN } from '../../universal/consts/cookieConsts';
import { SUCCESS, ERROR } from '../../universal/consts/phaseConsts';
import { refreshLogin } from '../../universal/modules/user/userApi';

async function maybeLogin(refreshToken) {
  try {
    if (refreshToken) {
      // URL needs to be set also here due to login
      axios.defaults.baseURL = URL;

      const { data } = await refreshLogin({ refreshToken });

      logger.info(`[getInitialState] logged in as: ${data.user.username}`);
      return { token: data.token, user: data.user, phase: SUCCESS };
    }

    return {};
  } catch (err) {
    logger.error('[getInitialState] login failed', err);
    return { phase: ERROR, error: err.data };
  }
}

export default async function getInitialState(req, messages) {
  const refreshToken = req.cookies[REFRESH_TOKEN];
  const login = await maybeLogin(refreshToken);

  return {
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
    user: {
      ...login,
      refreshToken,
    },
  };
}
