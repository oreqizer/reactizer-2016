import webpack from 'webpack';
import Assets from 'assets-webpack-plugin';

import base from './webpack.base';

import { output } from '../config';

export default {
  ...base,
  output: {
    ...base.output,
    filename: 'bundle.[hash].js',
  },
  plugins: [
    ...base.plugins,
    new Assets({ path: output }),
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
