const gulp = require('gulp');
const path = require('path');
const connect = require('gulp-connect');
const browserSync = require('browser-sync'); //创建一个开发服务器
const concat = require('gulp-concat'); // 合并文件
const rename = require('gulp-rename'); // 修改文件名
const uglify = require('gulp-uglify'); //使用uglify压缩
const del = require('del'); //删除文件
const clean = require('gulp-clean'); //删除文件
const gulpif = require('gulp-if'); //if判断语句
const minifyCss = require('gulp-minify-css'); //压缩CSS样式
const autoprefixer = require('gulp-autoprefixer'); //自动添加CSS前缀
const less = require('gulp-less'); //支持less
const argv = require('yargs').argv;
const env = argv.env;
var reload = browserSync.reload;
console.log('env', argv.env);
var entryPath = path.resolve(__dirname, '../');
var output = path.resolve(__dirname, '../dist/');

gulp.task('clean', async () => {
  // 强制删除文件
  const deletedPaths = await del(['../dist', '../out'], {
    force: true // 强制删除外部的文件
  });
  console.log('删除文件和文件夹:\n', deletedPaths.join('\n'));
  //   await gulp.src([path.resolve(entryPath, './dist'), path.resolve(entryPath, './out')]).pipe(clean({ force: true }));
});

gulp.task('app', async () => {
  console.log('app start');
  await gulp
    .src(path.resolve(entryPath, './src/*.js'))
    .pipe(concat('app.js')) //合并
    .pipe(gulp.dest('../out/js'))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(argv.production, rename({ suffix: '.min' }))) //修改文件名
    .pipe(gulp.dest('../dist/js'))
    .pipe(reload({ stream: true })); // 调用 stream 方法，更新文件
  // .pipe(connect.reload());
  console.log('app end');
});
/* gulp.watch(path.resolve(entryPath, './*.js'), function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}); */

gulp.task('foo', async () => {
  console.log('foo start');
});

gulp.task('css', async () => {
  await gulp
    .src([path.resolve(entryPath, './static/css/*.css'), path.resolve(entryPath, './static/less/*.less')])
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ff 17', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifyCss())
    .pipe(gulp.dest('../dist/css'))
    .pipe(reload({ stream: true }));
  // .pipe(connect.reload());

  console.log('css end');
});

gulp.task('watchs', async () => {
  // gulp.watch('../index2.html', reload());
  gulp.watch('../static', gulp.series('css'));
  gulp.watch('../src', gulp.series('app'));
});

// 实现刷新功能
gulp.task('connect', async () => {
  await connect.server({
    root: path.resolve(entryPath),
    livereload: true, //自动更新
    port: 9909 //端口
  });
});

gulp.task('browserSync', async () => {
  await browserSync({
    // 更改 端口
    port: 7070,
    ui: {
      //更改可视化控制页面端口
      port: 7001
    },
    // 监听文件
    files: '../index2.html',
    server: {
      // https: true, //启用HTTPS静态文件服务器
      baseDir: path.resolve(entryPath), // 从这个项目的目录启动服务器
      index: 'index2.html' //指定特定文件名为索引
    }
  });
});

gulp.task(
  'default',
  gulp.series('clean', 'watchs', 'app', 'foo', 'css', done => {
    done();
    // 将你的默认的任务代码放在这
    console.log('default 打包完成');
  })
);

gulp.task(
  'server',
  gulp.series('clean', 'browserSync', 'watchs', 'app', 'foo', 'css', done => {
    done();
    // 将你的默认的任务代码放在这
    console.log('default 打包完成');
  })
);
