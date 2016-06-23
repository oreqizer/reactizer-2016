import webpack from 'webpack';
import ExtractText from 'extract-text-webpack-plugin';

import base from './webpack.base';

const styleLoader = {
  test: /\.styl$/,
  loader: ExtractText.extract(['css', 'postcss', 'stylus']),
};

export default {
  ...base,
  module: {
    loaders: [...base.module.loaders, styleLoader],
  },
  plugins: [
    ...base.plugins,
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

