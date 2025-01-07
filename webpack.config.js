const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js', // JavaScript entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js', // Output JS bundle
    },
    module: {
        rules: [
            {
                test: /\.scss$/, // Process SASS/SCSS files
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/, // Process JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Use src/index.html as a template
            filename: 'index.html', // Output to dist/index.html
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'dist/css', to: 'css' }, // Copy css folder to dist/css
            ],
        }),
    ],
    mode: 'development',
};
