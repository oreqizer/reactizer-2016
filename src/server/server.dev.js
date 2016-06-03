import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import config from './../../etc/webpack/webpack.dev';
import logger from './lib/logger';
import { TMP, portDev } from './config';

import reactMiddleware from './express/reactMiddleware';

const app = express();

const compiler = webpack(config);

// Serve assets not processed by Webpack
app.use(express.static(join(__dirname, '../../', TMP)));

// Enables recompilation
app.use(webpackDev(compiler, {
  noInfo: true,
}));

// Enables hot-reloading
app.use(webpackHot(compiler, {
  noInfo: true,
}));

// allows getting cookies on server
app.use(cookieParser());

app.use(reactMiddleware);

app.listen(portDev, () =>
    logger.info(`Express listening at port: ${portDev}`));
