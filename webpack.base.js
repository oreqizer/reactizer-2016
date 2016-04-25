export default {
    entry: [
        './client/app.js'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json/, exclude: /node_modules/, loader: 'json' }
        ]
    }
};
