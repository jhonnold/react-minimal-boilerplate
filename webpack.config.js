const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[hash].js',
  },
  devServer: {
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['transform-class-properties'],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),

    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),

    new CleanWebpackPlugin(['dist']),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            unused: true,
            dead_code: true,
            warnings: false,
          },
        },
        sourceMap: true,
      }),
    ],
  },
  performance: { hints: false },
};
