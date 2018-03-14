const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    devServer:{
        contentBase: './public'
    },
    output: { 
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')     
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: rxPaths()
    }
}