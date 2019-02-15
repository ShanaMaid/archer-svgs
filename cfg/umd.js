const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    Archer: path.resolve(__dirname, '../src/Archer.ts')
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, '../lib/'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    library: 'Archer',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: ['ts-loader'],
        include: [
          path.resolve(__dirname, '../src/'),
        ],
      }
    ]
  },
  optimization: {
    minimize: true,
  },
  devtool: false  
}