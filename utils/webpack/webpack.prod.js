import path from 'path';

import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';

import common from './webpack.common';

const OUTPUT = 'dist';

export default {
    ...common,
    output: {
        path: path.join(__dirname, OUTPUT),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new Visualizer()
    ],
    devtool: 'source-map'
};

