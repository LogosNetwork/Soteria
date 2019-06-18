'use strict'

process.env.BABEL_ENV = 'main'

const path = require('path')
const { dependencies } = require('../package.json')
const webpack = require('webpack')

let mainConfig = {
  entry: {
    main: path.join(__dirname, '../src/main/index.js'),
    preload: path.join(__dirname, '../src/main/preload.js')
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.node']
  },
  target: 'electron-main',
  mode: 'development'
}

/**
 * Adjust mainConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  mainConfig.externals.push('electron-debug')
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
    })
  )
}

/**
 * Adjust mainConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  const TerserPlugin = require('terser-webpack-plugin')
  mainConfig.mode = 'production'
  mainConfig.optimization = {
    minimizer: [new TerserPlugin()]
  }
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
}

module.exports = mainConfig
