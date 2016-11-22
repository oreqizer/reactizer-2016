import { join } from 'path';
import webpack from 'webpack';

import base, { loaders, plugins } from './webpack.base';

const styleLoader = {
  test: /\.scss$/,
  loader: 'style!css!postcss!sass',
};

export default {
  ...base,
  entry: [
    'webpack-hot-middleware/client',
    ...base.entry,
  ],
  output: {
    path: join(__dirname, '.tmp/static'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [...loaders, styleLoader],
  },
  plugins: [
    ...plugins,
    new webpack.SourceMapDevToolPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
