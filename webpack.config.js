const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',

    library: 'default',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};