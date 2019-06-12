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
  resolve: {
    alias: {
      '@': path.join(__dirname, '/static/')
    }
  },
  module: {
    // loader放在rules这个数组里面
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // 添加自定义 attrs 到 style 标签
              attrs: {
                id: 'foo'
              },
              // 在给定位置处插入style标签
              insertAt: 'bottom',
              // 给定位置中插入style标签
              insertInto: 'head',
              // 启用/禁用 Sourcemap
              // sourceMap: true,
              singleton: true // 合并style标签，默认false
            }
          },
          {
            loader: 'css-loader',
            options: {
              // 修改css中url指向的根目录
              // 示例：url(/image.png) => url(./img/image.png)
              // root:'../static',
              // 启用/禁用 url() 处理
              // 默认启用
              // url: false,
              alias: {
                '@': path.join(__dirname, '/static/')
              },
              // 是否 启用/禁用 @import 处理
              // 默认为true,表示启用
              // import: false,
              // 是否 启用/禁用 压缩
              // 默认为false,表示不压缩
              minimize: true,
              // 是否启用/禁用 Sourcemap
              // 默认false，不启用
              sourceMap: true
              // 启用/禁用 CSS 模块
              // 默认false,不启用
              // modules: true,
              // 是否启用/禁用 以驼峰化式命名导出类名
              // 默认false,不启用
              // camelCase: true,
              // 定制哈希字符串的格式
              // localIdentName:'[path][name]---[local]---[hash:base64:5]',
              // importLoaders: 0 // 感觉没什么用
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 这个是普通带[path]的，对context生效
              // name: '[path][name].[hash:10].[ext]',   // 文件名，这个是将图片放在打包后的img文件夹中

              // 当name里使用了[path]的时候，这个才有意义，其他时候没必要加
              // context: __dirname + '/../',
              name: '[name][hash:6].[ext]', // 文件名，这个是将图片放在打包后的img文件夹中
              // publicPath: 'https://www.abc.cn/img/',

              // 输出目录，表现效果相当于 outputPath + name 这样，可以直接写在name里如 myImage/[name].[ext] 效果一样
              // outputPath: function (fileName) {
              //     return 'myImage/' + fileName    // 后面要拼上这个 fileName 才行
              // },

              // 文件路径使用 源代码中，图片相对于css文件路径
              // useRelativePath: true

              // 不生成打包后的图片
              // emitFile: false
            }
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
