const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        hot: true,
        port: 9001
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                loader: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/i,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/i,
                loader: ['style-loader', 'css-loader','less-loader']
            },
            {
                test: /\.(png|jpe?g|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './public/index.html',
            filename: './index.html'
        })
    ],
    resolve: {
        /* Aliases can be used in ".less" files, by adding a ~ character to the front of the import. */
        alias: {
            components: path.resolve(__dirname, 'src/components')
        }
    }
}
