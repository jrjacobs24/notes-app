const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDir = 'dist';

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, outputDir),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/client/'), 'node_modules'],
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin([outputDir]),
    new HTMLWebpackPlugin({
      title: 'Notes For the Taking',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
};
