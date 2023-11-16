const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = 'src';
const DES_DIR = 'build';

module.exports = {
    entry: path.join(__dirname, SRC_DIR),
    output: {
        path: path.join(__dirname, DES_DIR),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.plain\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /^(?!.*?\.plain).*\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[local]__[hash:base64:5]"
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve('src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, SRC_DIR, 'index.html'),
            filename: 'index.html'
        })
    ]
}