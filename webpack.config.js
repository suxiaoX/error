const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolve = file => path.resolve(__dirname, file)

module.exports = {
  entry: [
    path.join(__dirname, './src/index.js')
  ],
  devServer: {
    port: 3000,
  },
  devtool: '#source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('public/index.html')
    }),
    new CleanWebpackPlugin()
  ]
}