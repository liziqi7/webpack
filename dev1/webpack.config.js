var path = require('path');

module.exports = {
  // 入口文件，指向app.js
  // 相当于: {main:'./app.js'}
  entry: path.resolve(__dirname, './app.js'),
  // 出口文件
  output: {
    // 文件名，将打包好的导出为bundle.js
    filename: './bundle.js',
    // 指定输出的文件目录
    path: path.resolve(__dirname, './dist')
  }
};
