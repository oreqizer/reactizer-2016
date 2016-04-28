import path from 'path';
import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';
import ExtractText from 'extract-text-webpack-plugin';

import base from './webpack.base.js';
import env from './etc/config/env';

const styleLoader = {
  test: /\.styl$/,
  loader: ExtractText.extract(['css', 'postcss', 'stylus']),
};

export default {
  ...base,
  output: {
    path: path.join(__dirname, env.DIST),
    filename: 'bundle.js',
  },
  module: {
    loaders: [...base.module.loaders, styleLoader],
  },
  plugins: [
    new ExtractText('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      screw_ie8: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new Visualizer(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV || 'production',
      },
    }),
  ],
  devtool: 'source-map',
};

