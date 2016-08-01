import webpack from 'webpack';
import ExtractText from 'extract-text-webpack-plugin';
import Assets from 'assets-webpack-plugin';

import base, { output, loaders, plugins } from './webpack.base';

import config from '../config';

const styleLoader = {
  test: /\.styl$/,
  loader: ExtractText.extract('css!postcss!stylus'),
};

export default {
  ...base,
  output: {
    ...output,
    filename: 'bundle.[hash].js',
  },
  modules: {
    loaders: [loaders, styleLoader],
  },
  plugins: [
    ...plugins,
    new Assets({ path: config.output }),
    new ExtractText('styles.[hash].css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: {
        screw_ie8: true,
      },
      compress: {
        warnings: false,
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  devtool: 'cheap-source-map',
};
