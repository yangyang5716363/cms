
import './header.less';
import './index.less';
import './iconfont.css';
document.getElementById('icon-wap-head').onclick=function(){
  let name = document.getElementById('body').getAttribute('class')
  if (name) {
    document.getElementById('body').setAttribute('class', '')
  } else {
    document.getElementById('body').setAttribute('class', 'wap-nav')
  }
}
document.getElementById('icon-search').onclick = () => {
  let searchStr = document.getElementById('newSearchBox-input').value
  let searchUrl = document.getElementById('icon-search').getAttribute('searchUrl')
  let pcolumnId = document.getElementById('icon-search').getAttribute('pcolumnId')
  let locationHref = searchUrl+'?searchStr='+searchStr+'&pcolumnId='+pcolumnId
  window.open(locationHref)
}
console.log('首页的js运行了～～')