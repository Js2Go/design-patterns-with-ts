const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, '../src/main.ts'),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'design-patterns-with-ts'
    })
  ]
}
