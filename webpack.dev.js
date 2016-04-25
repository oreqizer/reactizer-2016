import path from 'path';
import webpack from 'webpack';

import common from './webpack.base.js';
import env from './etc/config/env';

export default {
  ...common,
  entry: [
    `webpack-dev-server/client?http://127.0.0.1:${env.PORT_DEV}/`,
    'webpack/hot/only-dev-server',
    ...common.entry
  ],
  output: {
    path: path.join(__dirname, env.TMP),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': 'dev' // TODO to env, make it work
    // })
  ],
  devtool: 'inline-source-map'
};
