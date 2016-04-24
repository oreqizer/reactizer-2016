import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import logger from './logger';
import config, { PORT } from './webpack/webpack.dev.js';

const PORT_NODE = 3000;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    hot: true,
    proxy: {
        '*': `http://127.0.0.1: ${PORT_NODE}`
    },
    host: '127.0.0.1'
});

server.listen(PORT, () => logger.info(`WebpackDevServer running at port: ${PORT}`));
