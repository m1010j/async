var path = require('path');

module.exports = {
  entry: './frontend/entry.js',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'public', 'scripts'),
  },
  module: {
    rules: [
      {
        test: [/\.js?$/],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*'],
  },
  mode: 'development',
};
