import { join } from 'path';
import express from 'express';

import logger from './../../etc/tools/logger';
import env from './../../etc/config';

import reactMiddleware from './middleware/reactMiddleware';

const app = express();

if (process.env.NODE_ENV === env.BETA) {
  // served by Nginx in production
  app.use(express.static(join(__dirname, '../../', env.DIST)));
  logger.info(`Static files served from directory: ${env.DIST}`);
}

app.use(reactMiddleware);

app.listen(env.PORT, () =>
    logger.info(`Express listening at port: ${env.PORT}`));
