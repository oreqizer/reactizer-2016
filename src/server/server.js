import 'babel-polyfill';
// babel's regenerator-runtime ready
import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';

import logger from './lib/logger';
import { port } from './config';

import reactMiddleware from './reactApp';
import configureGlobals from '../universal/configureGlobals';

// configure globals
configureGlobals();

const app = express();

// serves static files
const output = join(__dirname, '../static');

app.use(express.static(output));
logger.info(`[server] static files served from directory: ${output}`);

// allows getting cookies on server
app.use(cookieParser());

app.use(reactMiddleware);

app.listen(port, () =>
    logger.info(`[server] express listening at port: ${port}`));
