import 'babel-polyfill';
// babel's regenerator-runtime ready
import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import logger from './lib/logger';
import { port, output } from './config';

import reactMiddleware from './express/reactMiddleware';

const app = express();

// serves static files
app.use(express.static(join(__dirname, '../../', output)));
logger.info(`Static files served from directory: ${output}`);

// allows getting cookies on server
app.use(cookieParser());

app.use(reactMiddleware);

app.listen(port, () =>
    logger.info(`Express listening at port: ${port}`));
