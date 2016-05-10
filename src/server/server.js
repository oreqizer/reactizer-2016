import { join } from 'path';
import express from 'express';

import logger from '../../etc/lib/logger';
import { port, production, output } from './../../etc/config';

import reactMiddleware from './middleware/reactMiddleware';

const app = express();

if (!production) {
  // served by Nginx in production
  app.use(express.static(join(__dirname, '../../', output)));
  logger.info(`Static files served from directory: ${output}`);
}

app.use(reactMiddleware);

app.listen(port, () =>
    logger.info(`Express listening at port: ${port}`));
