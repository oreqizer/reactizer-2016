import { join } from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import config from './../../etc/webpack/webpack.dev';
import logger from './../../etc/tools/logger';
import processAssets from './../../etc/tasks/assets';
import { TMP, port_dev } from './../../etc/config';

import reactMiddleware from './middleware/reactMiddleware';

processAssets(TMP);

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

app.use(reactMiddleware);

app.listen(port_dev, () =>
    logger.info(`Express listening at port: ${port_dev}`));
