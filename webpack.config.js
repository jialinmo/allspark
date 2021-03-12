const path = require('path');

const { entryDetector } = require('./build/common/entry-detector');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// css 分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { constants } = require('buffer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  console.log('NODE_ENV: ', env.NODE_ENV);
  return {
    mode: 'development',       // dev
    entry: entryDetector.entry,
    devtool: 'inline-source-map', // dev
    devServer: {                  // dev
      contentBase: './dist',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),

      // 结构分析模块
      //new BundleAnalyzerPlugin(),

      ...entryDetector.htmlWebpackPlugins

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
          test: /\.js$/i,
          use: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
            // {
            //   loader: 'px2rem-loader',
            //   options: {
            //     remUnit: 75,
            //     remPrecesion: 8
            //   }
            // }
          ],
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