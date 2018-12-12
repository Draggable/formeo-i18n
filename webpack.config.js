const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'production',
  target: 'web',
  entry: './src/js/index.js',
  output: {
    filename: '[name].min.js',
    libraryTarget: 'commonjs2',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [new CopyWebpackPlugin([{ from: 'lang/*.lang', to: './', context: 'src/' }], { debug: 'debug' })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
}
