import { join } from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import webpackConfig from '../webpack/webpack.dev';

import setupApp from '../../packages/reactizer-web/src/server/setupApp';
import fetchData from '../../packages/reactizer-web/src/server/tools/fetchData';
import logger from '../../packages/reactizer-web/src/server/lib/logger';
import { portDev, locales } from '../../packages/reactizer-web/src/server/config';

const app = express();

const compiler = webpack(webpackConfig);

// serve assets not processed by Webpack
app.use(express.static(join(__dirname, '../../.tmp/static')));

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

// fetch required data
const data = fetchData({
  locales,
  localesFolder: join(__dirname, '../../locales'),
  assetsFile: join(__dirname, 'assets.json'),
});

// setup react middleware
app.use(setupApp(data));

app.listen(portDev, () =>
    logger.info(`[devserver] listening at port: ${portDev}`));
