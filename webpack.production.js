import path from 'path';
import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';

import base from './webpack.base.js';
import env from './etc/config/env';

export default {
  ...base,
  output: {
    path: path.join(__dirname, env.DIST),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new Visualizer(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': 'production' // TODO to env, make it work
    // })
  ],
  devtool: 'source-map'
};

