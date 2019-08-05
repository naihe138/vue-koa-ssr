const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const ServerClienRender = require('vue-server-renderer/client-plugin')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = merge(base, {
  entry: {
    client: resolve('../src/client-entry.js')
  },
  plugins: [
    new ServerClienRender(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../public/index.html')
    })
  ]
})
