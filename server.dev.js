import express from 'express';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import config from './webpack.dev';

import startReact from './server/server';
import logger from './etc/tools/logger';
import { PORT_DEV } from './etc/config/env';

const app = express();

const compiler = webpack(config);

// Enables recompilation
app.use(webpackDev(compiler, {
  noInfo: true,
}));

// Enables hot-reloading
app.use(webpackHot(compiler, {
  noInfo: true,
}));

const server = startReact(app);

server.listen(PORT_DEV, () =>
    logger.info(`Express listening at port: ${PORT_DEV}`));
