import webpack from 'webpack';

import base from './webpack.base';

export default {
  ...base,
  entry: [
    'webpack-hot-middleware/client',
    ...base.entry,
  ],
  output: {
    ...base.output,
    filename: 'bundle.js',
  },
  plugins: [
    ...base.plugins,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  devtool: 'cheap-module-eval-source-map',
};
