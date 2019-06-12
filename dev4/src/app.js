/**
 * Created by 王冬 on 2017/11/29.
 * QQ: 20004604
 * weChat: qq20004604
 */
// 纯占位作为入口使用
import './style/style.css';
import './less/style.less';

// import baz from './style/baz.css'

// console.log(baz)
// document.querySelector('.bottom').innerHTML = baz.abcDef
let foo = () => {
  console.log('1');
  console.log('加载CSS 完成！');
};
foo();

let bar = new Promise((resolve, reject) => {
  resolve(2);
});
bar.then(msg => console.log(msg));

let qq = {
  a: 1,
  b: 2
};

// let gg = {c: 3, qq}

console.log(qq);
