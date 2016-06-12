import { join } from 'path';
import webpack from 'webpack';
import Assets from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';

import { output, production } from '../config';

const jsLoader = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    babelrc: false,
    presets: ['react', 'es2015-native-modules', 'stage-1'],
    plugins: ['transform-decorators-legacy'],
  },
};

const imgLoader = {
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: [
    'url?limit=10000&name=[name].[hash].[ext]',
    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
  ],
};

export default {
  context: __dirname,
  entry: ['../../src/browser/index.js'],
  output: {
    path: join(__dirname, '../../', output),
    publicPath: '/',
    filename: 'bundle.[hash].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
  },
  module: {
    loaders: [jsLoader, imgLoader],
  },
  plugins: [
    new Assets({ path: join(__dirname, '../../data') }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(production ? 'production' : 'dev') },
    }),
  ],
  postcss: () => [autoprefixer],
};
