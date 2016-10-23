import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

import config from '../config';

export const loaders = [{
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    babelrc: false,
    presets: ['react', ['es2015', { modules: false }], 'stage-1'],
  },
}, {
  test: /\.(jpe?g|png|gif|svg)$/i,
  loaders: [
    'url?limit=10000&name=[name].[hash].[ext]',
    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
  ],
}];

export const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(config.production ? 'production' : 'dev') },
  }),
  new webpack.LoaderOptionsPlugin({
    test: /\.scss$/,
    options: {
      postcss: () => [autoprefixer],
    },
  }),
];

export default {
  context: __dirname,
  entry: ['../../src/browser/index.js'],
  resolve: {
    extensions: ['.js', '.jsx', '.styl'],
  },
};
