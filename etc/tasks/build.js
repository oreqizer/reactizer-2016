import webpack from 'webpack';

import config from './../webpack/webpack.build';
import processAssets from './assets';
import logger from './../tools/logger';
import { DIST } from './../config/env';

processAssets(DIST);

webpack(config, () => logger.info('Webpack compilation done.'));

