/* eslint-disable no-undef */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = (env) => {
  return {
    mode: env.dev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
      filename: env.dev ? '[name].js' : '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    devtool: env.dev ? 'eval-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset/resource'
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: 'single'
    },
    plugins: [
      new ESLintPlugin({
        exclude: ['node_modules', 'dist'],
        context: path.resolve(__dirname, 'src')
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        minify: !env.dev && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new Dotenv({
        path: '.env', // Path to .env file
        safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      allowedHosts: 'all',
      compress: true,
      port: 3000,
      historyApiFallback: true,
      hot: true
    }
  }
}
