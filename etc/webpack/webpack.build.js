import { join } from 'path';
import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';
import ExtractText from 'extract-text-webpack-plugin';

import base from './webpack.base';
import { DIST } from './../config';

const styleLoader = {
  test: /\.styl$/,
  loader: ExtractText.extract(['css', 'postcss', 'stylus']),
};

export default {
  ...base,
  output: {
    path: join(__dirname, '../../', DIST),
    filename: 'bundle.[hash].js',
  },
  module: {
    loaders: [...base.module.loaders, styleLoader],
  },
  plugins: [
    ...base.plugins,
    new ExtractText('styles.[hash].css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
      },
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new Visualizer(),
  ],
  devtool: 'source-map',
};

