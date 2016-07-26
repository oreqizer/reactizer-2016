import webpack from 'webpack';

import base from './webpack.base';

const styleLoader = {
  test: /\.styl$/,
  loader: 'style!css!postcss!stylus',
};

export default {
  ...base,
  module: {
    loaders: [...base.module.loaders, styleLoader],
  },
  plugins: [
    ...base.plugins,
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

