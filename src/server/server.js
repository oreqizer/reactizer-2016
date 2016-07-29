import 'babel-polyfill';
// babel's regenerator-runtime ready
import { join } from 'path';
import nconf from 'nconf';
import express from 'express';
import cookieParser from 'cookie-parser';

import setupApp from './setupApp';
import fetchData from './tools/fetchData';
import logger from './lib/logger';
import { port, locales } from './config';

const app = express();

// serves static files
const output = join(__dirname, '../static');

app.use(express.static(output));
logger.info(`[server] static files served from directory: ${output}`);

// fetch crucial data
nconf.set('file:assets', join(__dirname, '../webpack-assets.json'));
nconf.set('folder:locales', join(__dirname, '../locales'));

// allows getting cookies on server
app.use(cookieParser());

// fetch required data
const data = fetchData({
  locales,
  localesFolder: join(__dirname, '../locales'),
  assetsFile: join(__dirname, '../webpack-assets.json'),
});

// setup react middleware
app.use(setupApp(data));

app.listen(port, () =>
    logger.info(`[server] express listening at port: ${port}`));
