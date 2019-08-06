const webpack = require('webpack')
const path = require('path')
const VueLoader = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: resolve('../dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.css']
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { safe: true, map: false }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        // use: [MiniCssExtractPlugin.loader, 'vue-style-loader', 'css-loader']
        use: [{
          loader: MiniCssExtractPlugin.loader,
          // options: {
          //   publicPath: (resourcePath, context) => {
          //     return path.relative(path.dirname(resourcePath), context) + '/';
          //   },
          // },
        }, 'css-loader']
      },
      {
        test: /.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoader(),
    // css 提取
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
      sourceMap: false
    })
  ]
}
