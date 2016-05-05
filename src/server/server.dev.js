import { join } from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';

import config from './../../etc/webpack/webpack.dev';

import logger from './../../etc/tools/logger';
import processAssets from './../../etc/tasks/assets';
import startReact from './middleware/reactMiddleware';
import { TMP, PORT_DEV } from './../../etc/config/env';

processAssets(TMP);

const app = new Koa();

const compiler = webpack(config);

// Serve assets not processed by Webpack
app.use(serve(join(__dirname, '../../', TMP)));

// Enables recompilation
app.use(async (ctx, next) => {
  await webpackDev(compiler, { noInfo: true }).bind(null, ctx.req, ctx.res);
  await next();
});

// Enables hot-reloading
app.use(async (ctx, next) => {
  await webpackHot(compiler, { noInfo: true }).bind(null, ctx.req, ctx.res);
  await next();
});

const server = startReact(app);

server.listen(PORT_DEV, () =>
    logger.info(`Express listening at port: ${PORT_DEV}`));
