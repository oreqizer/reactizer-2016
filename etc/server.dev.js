import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import config from './webpack/webpack.dev';
import logger from '../src/server/lib/logger';
import { TMP, portDev } from '../src/server/config';

import reactMiddleware from '../src/server/express/reactMiddleware';
import configureGlobals from '../src/universal/configureGlobals';

const app = express();

const compiler = webpack(config);

// configure globals
configureGlobals();

// serve assets not processed by Webpack
app.use(express.static(join(__dirname, '../', TMP, 'static')));

// enables recompilation
app.use(webpackDev(compiler, {
  noInfo: true,
}));

// enables hot-reloading
app.use(webpackHot(compiler, {
  noInfo: true,
}));

// allows getting cookies on server
app.use(cookieParser());

app.use(reactMiddleware);

app.listen(portDev, () =>
    logger.info(`Express listening at port: ${portDev}`));
