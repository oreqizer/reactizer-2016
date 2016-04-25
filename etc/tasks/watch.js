import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import logger from './../tools/logger';
import config from './../../webpack.dev.js';
import env from '../config/env';

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    hot: true,
    proxy: {
        '*': `http://127.0.0.1: ${env.PORT}`
    },
    host: '127.0.0.1'
});

server.listen(env.PORT_DEV, () =>
    logger.info(`WebpackDevServer running at port: ${env.PORT_DEV}`));
