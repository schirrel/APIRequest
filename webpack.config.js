
const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        library: 'index',
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: 'index.js',
        path: path.resolve(__dirname, '')
    }
};