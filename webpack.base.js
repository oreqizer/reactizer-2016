import autoprefixer from 'autoprefixer';

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

export default {
  context: __dirname,
  entry: ['./client/index.js'],
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
  },
  module: {
    loaders: [jsLoader],
  },
  postcss: () => [autoprefixer],
};
