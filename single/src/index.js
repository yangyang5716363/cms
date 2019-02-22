
import './header.less';
import './index.less';
import './iconfont.css';
document.getElementById('icon-wap-head').onclick = () => {
  let name = document.getElementById('body').getAttribute('class')
  if (name) {
    document.getElementById('body').setAttribute('class', '')
  } else {
    document.getElementById('body').setAttribute('class', 'wap-nav')
  }
}
console.log('首页的js运行了～～')