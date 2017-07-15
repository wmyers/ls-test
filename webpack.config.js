const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    main: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { 
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['transform-decorators-legacy', 'transform-runtime'],
            cacheDirectory: true
          },
        }],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ]
      },
      {
        test: /\.html$/,
        use: [
	        'html-loader'
        ]
      }
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'), 
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2,
    }),
    new webpack.DefinePlugin({  
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    })
  ],
  devServer: {
    contentBase: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './static')
    ],
    watchContentBase: true
  },
  devtool: 'inline-source-map'
};
