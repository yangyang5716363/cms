
import './header.less';
import './index.less';
import './iconfont.css';
import jsonp from 'jsonp';
const hostname = window.location.hostname === 'mgr.idvert.com' ? 'https://uat.idvert.com' : 'http://bb.esmtong.cn:82'
const jsonpUrl = hostname + '/api/dev'
window.onload = () => {
  document.getElementById('icon-wap-head').onclick = () => {
    let name = document.getElementById('body').getAttribute('class')
    if (name) {
      document.getElementById('body').setAttribute('class', '')
    } else {
      document.getElementById('body').setAttribute('class', 'wap-nav')
    }
  }
  pageInit(jsonpUrl)
  document.getElementById('icon-search').onclick = () => {
    let searchStr = document.getElementById('newSearchBox-input').value
    let searchUrl = document.getElementById('icon-search').getAttribute('searchUrl')
    let pcolumnId = document.getElementById('icon-search').getAttribute('pcolumnId')
    let locationHref = searchUrl+'?searchStr='+searchStr+'&pcolumnId='+pcolumnId
    console.log(locationHref)
    window.open(locationHref)
  }
}
const pageInit = (jsonpUrl) => {
  let dom = document.getElementById('count')
  let str = dom.getAttribute('data_id')
  let opts = {
    param: 'articleId=' + str + '&callback',
    name: 'callback'
  }
  jsonp(jsonpUrl + '/article/getArticleClicks', opts,
    (err, data) => {
      data ? Object.keys(data).map(key => {
        document.getElementById('count').innerHTML = data[key]
      }) : null
    }
  )
}