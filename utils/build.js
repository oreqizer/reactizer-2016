import webpack from 'webpack';

import config from './webpack/webpack.prod';
import logger from './logger';

// TODO stylus

webpack(config, () => logger.info('Webpack compilation done.'));

