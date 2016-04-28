export default {
  context: __dirname,
  entry: [
    './client/js/app.js'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        // babelrc: false,
        // presets: ['react', 'es2015-webpack', 'stage-1'],
        // plugins: ['add-module-exports', 'transform-decorators-legacy'],
      },
    }],
  },
};
