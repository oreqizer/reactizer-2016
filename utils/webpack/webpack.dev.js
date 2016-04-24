import path from 'path';

import webpack from 'webpack';

import common from './webpack.common';

export const PORT = 8080;

const OUTPUT = '.tmp';

export default {
    ...common,
    entry: [
        `webpack-dev-server/client?http://127.0.0.1:${PORT}/`,
        'webpack/hot/only-dev-server',
        ...common.entry
    ],
    output: {
        path: path.join(__dirname, OUTPUT),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map'
};
