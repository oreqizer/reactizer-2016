import webpack from 'webpack';
import ExtractText from 'extract-text-webpack-plugin';
import Assets from 'assets-webpack-plugin';

import base, { loaders, plugins } from './webpack.base';

import config from '../config';

const styleLoader = {
  test: /\.scss$/,
  loader: ExtractText.extract('css-loader!postcss-loader!sass-loader'),
};

export default {
  ...base,
  output: {
    path: `${config.output}/static`,
    publicPath: '/',
    filename: 'bundle.[hash].js',
  },
  module: {
    loaders: [...loaders, styleLoader],
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
