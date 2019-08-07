const webpack = require('webpack')
const path = require('path')
const VueLoader = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const resolve = dir => path.resolve(__dirname, dir)
const isPro = process.env.NODE_ENV === 'production'
const webpackConfig = {
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: resolve('../dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.css']
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        sourceMap: true,
        cache: '../build-catch/',
        terserOptions: {
          compress: {
            inline: 1, // https://github.com/mishoo/UglifyJS2/issues/2842
            warnings: false,
            drop_console: isPro,
            drop_debugger: isPro
          },
          output: {
            comments: false
          }
        }
      }),
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
        use: isPro ? [
          {
            loader: MiniCssExtractPlugin.loader,
          }, 
          'css-loader'
        ]: ['vue-style-loader', 'css-loader']
      },
      {
        test: /.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueLoader()
  ]
}

if (isPro) {
  webpackConfig.plugins.push(
    // css 提取
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css',
      sourceMap: false
    })
  )
}

module.exports = webpackConfig