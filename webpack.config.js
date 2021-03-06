const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// css 分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  console.log('NODE_ENV: ', env.NODE_ENV);
  return {
    mode: 'development',       // dev
    entry: {
      index: {
        import: './src/index.js',
        dependOn: 'shared',
      },
      login: {
        import: './src/login.js',
        dependOn: 'shared',
      },
      shared: 'lodash',
    },
    devtool: 'inline-source-map', // dev
    devServer: {                  // dev
      contentBase: './dist',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),

      // 结构分析模块
      //new BundleAnalyzerPlugin(),

      new HtmlWebpackPlugin({
        title: 'Development',
      })
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
  }
}