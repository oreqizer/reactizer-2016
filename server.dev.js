import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import config from './webpack.dev';

import startReact from './server/server';
import logger from './etc/tools/logger';
import env from './etc/config/env';

const app = express();

const compiler = webpack(config);

app.use(webpackDev(compiler, {
  noInfo: true,
}));

app.use(webpackHot(compiler, {
  noInfo: true,
}));

// app.use(express.static(path.join(__dirname, env.TMP)));
// logger.info(`Static files served from directory: ${env.TMP}`);

const server = startReact(app);

server.listen(env.PORT, () =>
    logger.info(`Express listening at port: ${env.PORT}`));
