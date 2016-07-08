import 'babel-polyfill';
// babel's regenerator-runtime ready
import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import logger from './lib/logger';
import { port, output } from './config';

import reactMiddleware from './reactApp';
import configureGlobals from '../universal/configureGlobals';

// configure globals
configureGlobals();

const app = express();

// serves static files
app.use(express.static(join(__dirname, '../../', output, 'static')));
logger.info(`[server] static files served from directory: ${output}`);

// allows getting cookies on server
app.use(cookieParser());

app.use(reactMiddleware);

app.listen(port, () =>
    logger.info(`[server] express listening at port: ${port}`));
