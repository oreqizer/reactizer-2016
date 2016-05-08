import { join } from 'path';
import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';
import ExtractText from 'extract-text-webpack-plugin';

import base from './webpack.base';
import { output, production } from './../config';

const dev = !production;

const styleLoader = {
  test: /\.styl$/,
  loader: ExtractText.extract(['css', 'postcss', 'stylus']),
};

export default {
  ...base,
  output: {
    path: join(__dirname, '../../', output),
    filename: 'bundle.[hash].js',
  },
  module: {
    loaders: [...base.module.loaders, styleLoader],
  },
  plugins: [
    ...base.plugins,
    new ExtractText('styles.[hash].css'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: dev ? false : {
        screw_ie8: true,
      },
      compress: dev ? false : {
        warnings: dev,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new Visualizer(),
  ],
  devtool: 'source-map',
};

