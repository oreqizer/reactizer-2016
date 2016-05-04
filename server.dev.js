import { join } from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import config from './webpack.dev';

import logger from './etc/tools/logger';
import processAssets from './etc/tasks/assets';
import startReact from 'src/server/index';
import { TMP, PORT_DEV } from './etc/config/env';

processAssets(TMP);

const app = express();

const compiler = webpack(config);

// Serve assets not processed by Webpack
app.use(express.static(join(__dirname, TMP)));

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
