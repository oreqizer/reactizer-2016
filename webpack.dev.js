import path from 'path';
import webpack from 'webpack';

import base from './webpack.base.js';
import { TMP, DEV } from './etc/config/env';

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
    path: path.join(__dirname, TMP),
    filename: 'bundle.[hash].js',
  },
  plugins: [
    ...base.plugins,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEV),
      },
    }),
  ],
  devtool: 'inline-source-map',
};
