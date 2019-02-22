
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
  // 搜索事件
  document.getElementById('icon-search').onclick = () => {
    let searchStr = document.getElementById('newSearchBox-input').value
    let searchUrl = document.getElementById('icon-search').getAttribute('searchUrl')
    let pcolumnId = document.getElementById('icon-search').getAttribute('pcolumnId')
    let locationHref = searchUrl+'?searchStr='+searchStr+'&pcolumnId='+pcolumnId
    window.open(locationHref)
  }
  // 文章点击事件
  countClicks()
  // 页面访问次数渲染
  pageInit()
}

const pageInit = () => {
  let dom = document.querySelectorAll('#content-html .newListBox .count')
  let arr = []
  for (let i = 0; i < dom.length; i++) {
    arr.push(dom[i].getAttribute('id').slice(6))
  }
  let opts = {
    param: 'articleId=' + arr.join(',') + '&callback',
    name: 'callback'
  }
  jsonp(jsonpUrl + '/article/getArticleClicks', opts,
    (err, data) => {
      data ? Object.keys(data).map(key => {
        let id = 'count_' + key
        document.getElementById(id).innerHTML = data[key]
      }) : null
    }
  )
}
const countClicks = () => {
  let dom = document.querySelectorAll('#content-html .newListBox .countClicks')
  for (let i = 0; i < dom.length; i++) {
    dom[i].onclick = function (n) {
      const data_href = dom[n].getAttribute('data_href')
      let data_id = dom[n].getAttribute('data_id')
      let target = dom[n].getAttribute('target') === '_blank' ? '_blank' : '_self'
      let opts = {
        param: 'articleId=' + data_id + '&callback',
        name: 'callback'
      }
      return function () {
        jsonp(jsonpUrl + '/article/updateArticleClicks', opts,
          (err, data) => {
            data ? window.open(data_href, target) : null
          }
        )
      }
    }(i)
  }
}