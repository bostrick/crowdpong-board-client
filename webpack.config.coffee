HtmlWebpackPlugin = require('html-webpack-plugin')
CopyWebpackPlugin = require('copy-webpack-plugin')
path = require('path')

module.exports =

  mode: 'development'

  entry: './src/index.tsx'

  output:
    path: path.resolve(__dirname, 'dist')
    filename: 'bundle.js'

  module:
    rules: [
        test: /\.tsx?$/
        loader: 'awesome-typescript-loader'
      ,
        enforce: 'pre'
        test: /\.js$/
        loader: 'source-map-loader'
      ,
        test: /\.css$/
        loader: [
            loader: 'style-loader'
          ,
            loader: 'css-loader'
            options:
              sourceMap: true
        ]
    ]

  devtool: 'source-map'

  resolve:
    extensions: [ '.ts', '.tsx', '.js', '.json' ]

  plugins: [
    new HtmlWebpackPlugin(template: './src/index.html')
    new CopyWebpackPlugin([from: './src/static'])
  ]

#  externals:
#    react: "React"
#    'react-dom': "ReactDOM"



