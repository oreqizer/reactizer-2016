import 'babel-polyfill';
// babel's regenerator-runtime ready
import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import logger from './lib/logger';
import { port, production, output } from './config';

import reactMiddleware from './middleware/reactMiddleware';

const app = express();

if (!production) {
  // served by Nginx in production
  app.use(express.static(join(__dirname, '../../', output)));
  logger.info(`Static files served from directory: ${output}`);
}

// allows getting cookies on server
app.use(cookieParser());

app.use(reactMiddleware);

app.listen(port, () =>
    logger.info(`Express listening at port: ${port}`));
