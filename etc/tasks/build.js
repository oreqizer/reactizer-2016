import path from 'path';
import webpack from 'webpack';
import shelljs from 'shelljs';

import config from './../../webpack.build.js';
import logger from './../tools/logger';
import env from './../config/env';

shelljs.rm('-r', path.join(__dirname, `./../../${env.DIST}/*`));

webpack(config, () => logger.info('Webpack compilation done.'));

