var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    app: './src/main.ts'
  },

  output: {
    path: './public',
    filename: '[name].js'
  },

  devServer: {
    contentBase: "./public"
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules/],
        loader: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: './public/index.html'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false, screw_ie8 : true },
      output: { comments: false },
      mangle: { screw_ie8 : true }
    }),

    // causes errors with webpack-dev-server.. consider only using in production build
    new webpack.optimize.DedupePlugin(),

    new CompressionPlugin(),
  ]
};
