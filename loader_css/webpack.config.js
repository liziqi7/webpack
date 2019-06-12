// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  // 入口文件，指向app.js
  entry: {
    dist: path.resolve(__dirname, './src/app.js')
  },
  // 出口文件
  output: {
    path: __dirname + '/dist',
    // 文件名，将打包好的导出为bundle.js
    filename: '[name].js'
  },
  module: {
    // loader放在rules这个数组里面
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // root: __dirname + '/static/',
              // url: true,
              // alias: {
              //   '@': __dirname + '/static/'
              // },
              // 是否 启用/禁用 @import 处理
              // 默认为true,表示启用
              // import: false,
              // 是否 启用/禁用 压缩
              // 默认为false,表示不压缩
              minimize: true,
              // 是否启用/禁用 Sourcemap
              // 默认false，不启用
              sourceMap: true,
              // 启用/禁用 CSS 模块
              // 默认false,不启用
              modules: true,
              // 是否启用/禁用 以驼峰化式命名导出类名
              // 默认false,不启用
              camelCase: true
              // importLoaders: 0 // 感觉没什么用
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  // 将插件添加到webpack中
  plugins: [
    // 这里是添加的插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    })
  ]
};
