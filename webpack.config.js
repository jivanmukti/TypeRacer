const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    main: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["env", "react"]
        }
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './public')
  }
};
module.exports = config;