import { join } from 'path';
import express from 'express';

import logger from './../../etc/tools/logger';
import { port, production, DIST } from './../../etc/config';

import reactMiddleware from './middleware/reactMiddleware';

const app = express();

if (!production) {
  // served by Nginx in production
  app.use(express.static(join(__dirname, '../../', DIST)));
  logger.info(`Static files served from directory: ${DIST}`);
}

app.use(reactMiddleware);

app.listen(port, () =>
    logger.info(`Express listening at port: ${port}`));
