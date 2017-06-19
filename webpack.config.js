/**
 * Created by axetroy on 17-6-14.
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

module.exports = {
  entry: {
    main: './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                ].concat(isProduction ? [cssnano()] : [])
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('flex-grid.css'),
    new HtmlWebpackPlugin({
      template: path.join('index.html'),
      path: './dist',
      filename: 'index.html'
    })
  ],
  devtool: isProduction ? 'eval' : 'source-map',
  devServer: {
    contentBase: isProduction ? './dist' : './source',
    historyApiFallback: true,
    port: 6088,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: '0.0.0.0',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  }
};
