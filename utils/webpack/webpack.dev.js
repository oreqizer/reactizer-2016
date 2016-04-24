import path from 'path';

import webpack from 'webpack';

import common from './webpack.common';
import env from '../../config/env';

export default {
    ...common,
    entry: [
        `webpack-dev-server/client?http://127.0.0.1:${env.PORT_DEV}/`,
        'webpack/hot/only-dev-server',
        ...common.entry
    ],
    output: {
        path: path.join(__dirname, `../../${env.TMP}`),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devtool: 'inline-source-map'
};
