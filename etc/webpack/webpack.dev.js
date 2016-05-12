import { join } from 'path';
import webpack from 'webpack';

import base from './webpack.base';
import { TMP } from './../config';

const styleLoader = {
  test: /\.styl$/,
  loader: 'style!css!postcss!stylus',
};

export default {
  ...base,
  entry: [
    'webpack-hot-middleware/client',
    ...base.entry,
  ],
  module: {
    loaders: [...base.module.loaders, styleLoader],
  },
  output: {
    path: join(__dirname, '../../', TMP),
    filename: 'bundle.[hash].js',
  },
  plugins: [
    ...base.plugins,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  devtool: 'inline-source-map',
};
