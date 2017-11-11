require('dotenv').config();

const webpack = require('webpack');

const ENV = process.env;

const PATHS = {
  INPUT: {
    JS: `${__dirname}/src/js`,
    CSS: `${__dirname}/src/css`
  },
  OUTPUT: `${__dirname}/public`
};

module.exports = {
  entry: [
    `${PATHS.INPUT.JS}/index.js`,
    `${PATHS.INPUT.CSS}/index.less`
  ],
  output: {
    path: PATHS.OUTPUT,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: PATHS.INPUT.JS,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      }, {
        test: /\.less$/,
        include: PATHS.INPUT.CSS,
        loaders: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  devServer: {
    port: ENV.DEV_PORT,
    contentBase: './public',
    proxy: {
      '/api/**': {
        target: `http://localhost:${process.env.API_PORT}`,
        secure: false
      }
    }
  }
};
