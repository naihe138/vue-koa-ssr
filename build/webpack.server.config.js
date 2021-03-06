const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const ServerRenderPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const base = require('./webpack.base.config')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = merge(base, {
  entry: {
    server: resolve('../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2',
  },
  target: 'node', // 要给node的使用 let fs = require('fs')
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new ServerRenderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: resolve('../public/index.ssr.html'),
      excludeChunks: ['server'] // 排除某个模块
    })
  ]
})
