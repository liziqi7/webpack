var path = require('path');

module.exports = {
  // 入口文件
  entry: {
    first: path.resolve(__dirname, './first.js'),
    second: path.resolve(__dirname, './second.js')
  },
  // 出口文件
  output: {
    // 文件名，将打包好的文件，分别导出为first.js 和 second.js
    filename: '[name].js',
    // 指定输出的文件目录
    path: path.resolve(__dirname, './dist')
  }
};
