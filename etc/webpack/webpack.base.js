import webpack from 'webpack';
import ExtractText from 'extract-text-webpack-plugin';
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

const styleLoader = {
  test: /\.styl$/,
  loader: ExtractText.extract('style!css!postcss!stylus'),
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
    path: `${output}/static`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
  },
  module: {
    loaders: [jsLoader, styleLoader, imgLoader],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(production ? 'production' : 'dev') },
    }),
  ],
  postcss: () => [autoprefixer],
};
