const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ServerClienRender = require('vue-server-renderer/client-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = merge(base, {
  entry: {
    client: resolve('../src/client-entry.js')
  },
  plugins: [
    new ServerClienRender(),
    new webpack.DllReferencePlugin({
      manifest: require('../dll/vue-manifest.json')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../public/index.html')
    }),
    // 复制静态文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../dll/vue.dll.js'),
        to: path.resolve(__dirname, '../dist'),
        ignore: ['.*']
      }
    ])
  ]
})
