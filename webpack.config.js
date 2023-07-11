const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = (env) => ({
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                use: ['file-loader'], 
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.svgoMinify,
                    options: {
                      encodeOptions: {
                        multipass: true,
                        plugins: [
                            "preset-default",
                        ],
                      },
                    },
                  },
              }),
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Форма оплаты',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'assets', to: 'assets' }
            ],
        }),
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
    }
});