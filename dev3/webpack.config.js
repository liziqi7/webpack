const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件，指向app.js
  // 相当于: {main:'./app.js'}
  entry: path.resolve(__dirname, './app.js'),
  // 出口文件
  output: {
    // 文件名，将打包好的导出为bundle.js
    // 可以通过[hash:10]来限制长度（默认是20，这里输出10位）
    // 使用[hash]时，这里的hash值，即使文件没有改变，每次生成的结果也不同
    // chunk表示模块，chunkhash就是指根据模块内容计算出来的哈希值
    /* 
    [hash]	模块标识符(module identifier)的 hash	每次都不同（低版本webpack可能有问题)
    [chunkhash]	chunk 内容的 hash	模块内容不变，hash值不变（不能和hash同时使用)
    [name]	模块名称	就是entry的key，单入口缩写写法默认是main
    [id]	模块标识符(module identifier)	默认情况下是例如'0'，'1'之类
    */
    filename: './bundle.chunkhash=[chunkhash:10].name=[name].id=[id].js',
    // 指定输出的文件目录
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    // 这里是添加的插件
    new HtmlWebpackPlugin({
      title: 'My HTML',
      filename: 'page_index.html', // 生成的文件，默认是index.html
      template: path.resolve(__dirname, './page.html'), // 模板文件，将打包编译好的文件添加进去
      // 使用minify会对生成的html文件进行压缩
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true // 移除属性的引号
      },
      /*
      inject有四个值： true body head false
      true 默认值，script标签位于html文件的 body 底部
      body script标签位于html文件的 body 底部
      head script标签位于html文件的 head中
      false 不插入生成的js文件，这个几乎不会用到的
      */
      inject: true, // 设置插入JS的位置
      // 给生成的js文件尾部追加一个(?xxxx)hash值。这个hash值是本次webpack编译的hash值。默认false;
      hash: true
    })
  ]
};
