const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');
const webpack = require('webpack');
const isProd = process.env.NODE_ENV !== 'development';
const devtool = isProd ? {} : {devtool: 'source-map'};
const chunk = isProd ? {
  optimization: {
    splitChunks:  {
      chunks: 'all',
      minChunks: 3,
      name: 'common',
    },
    minimize: true,
  },
} : {};

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: path.resolve('./demo/entry.tsx'),
  output: {
    filename: 'js/build.js',
    path: path.resolve(__dirname, './docs'),
    publicPath: isProd ? './' : '/',
    chunkFilename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ['happypack/loader?id=ts'],
        include: [
          path.resolve('demo'),
          path.resolve('src'),
        ],
        exclude: [/__tests__/],
      },
      {
        test: /\.(css)$/,
        use: ['happypack/loader?id=css'],
        include: [
          path.resolve('demo'),
          path.resolve(__dirname, 'node_modules/yoshino'),
        ],
      },
    ]
  },
  ...chunk,
  ...devtool,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./demo/index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HappyPack({
      id: 'ts',
      loaders: [
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
        {
          loader: 'ui-component-loader',
          options: {
            lib: 'yoshino',
            libDir: 'lib',
            style: 'style/index.js'
          }
        }
      ]
    }),
    new HappyPack({
      id: 'css',
      loaders: ['css-hot-loader', 'style-loader', 'css-loader']
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "./docs"),
    compress: false,
    port: 9001,
    hot: true,
  },
};
