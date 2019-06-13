const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const opn = require('open');

const app = express();
const config = require('../webpack.config.js');

const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.listen(3003, function() {
  console.log('启动 监听 3003端口！');
});
opn('http://localhost:3003/index.html');
