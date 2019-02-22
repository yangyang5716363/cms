
import './header.less';
import './pagination.less';
import './index.less';
import './iconfont.css';
import $ from './jquery-vendor.js'
import pagination from 'paginationjs'
// 导航
let hostname = window.location.hostname === 'mgr.idvert.com' ? 'https://uat.idvert.com' : 'http://bb.esmtong.cn:82'
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
  const urlParams = GetRequest()
  paginationFun(urlParams,jsonpUrl)
  $('#newSearchBox-input').val(urlParams.searchStr)
  document.getElementById('icon-search').onclick = () => {
    let searchStr = document.getElementById('newSearchBox-input').value
    let searchUrl = document.getElementById('icon-search').getAttribute('searchUrl')
    let pcolumnId = document.getElementById('icon-search').getAttribute('pcolumnId')
    let locationHref = searchUrl+'?searchStr='+searchStr+'&pcolumnId='+pcolumnId
    window.open(locationHref)
    console.log(locationHref)
  }
}

const template = (data) => {
  $('#content-html .newListBox').html('');
  let str = '';
  let target = '_blank'
  if (data.length) {
    $('#noData').css('display', 'none');
    data.map(item => {
      str += '<li>' +
                '<a class="countClicks" data_id="'+ item.id +'" data_href="' + item.articleUrl + '" target="' + target + '">' + item.articleTitle + '</a>' +
                '<p>' +
                  '<span class="iconfont icon-time"></span> ' +
                  '<span id="time">' + item.showTime + '</span> ' +
                  '<span class="iconfont icon-eye"></span> ' +
                  '<span id="count">' + item.clicks + '</span>' +
                '</p>' +
              '</li>'
    })
  } else {
    $('#noData').css('display', 'block');
    $('#pagination-container').css('display', 'none');
  }
  return str
}
// 分页数据处理
const paginationFun = (urlParams,jsonpUrl) => {
  $('#pagination-container').pagination({
    dataSource: jsonpUrl+'/article/getArticleListBySearch',
    locator: 'list',
    pageSize: 20,
    prevText: '<',
    nextText: '>',
    totalNumberLocator: function (response) {
      return response.totalCount;
    },
    alias: {
      pageNumber: 'pageNo'
    },
    ajax: {
      beforeSend: () => {
        $('#loadEffectBox').css('display', 'block');
      },
      type: 'get',
      data: {
        pcolumnId: urlParams.pcolumnId ? urlParams.pcolumnId : null,
        searchStr: urlParams.searchStr ? urlParams.searchStr : null,
      }, 
      dataType: 'jsonp'
    },
    callback: (data, pagination) => {
      let html = template(data);
      $('#content-html .newListBox').html(html);
      $('#loadEffectBox').css('display', 'none');
      $('#content-html .newListBox a').click(function() {
        updateArticleClicks(jsonpUrl,updateArticleClicksSucc,this,)
      })    
    }
  })
}
const GetRequest = () => {   
  let searchUrl = location.search;  
  let theRequest = new Object();  
  if (searchUrl.indexOf('?') != -1) {   
    let str = searchUrl.substr(1);   
    let strs = str.split('&');   
    for (let i = 0; i < strs.length; i ++) {   
      theRequest[strs[i].split('=')[0]]=unescape(strs[i].split('=')[1]);   
    }   
  }   
  return theRequest;   
}
const updateArticleClicks = (jsonpUrl, successFun, dom) => {
  let articleId = $(dom).attr('data_id')
  $.ajax({
    type: "get",
    async: false,
    url: jsonpUrl + "/article/updateArticleClicks?articleId=" + articleId,
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback:"callback",
    success: function(data){
      successFun(data, dom)
    },
    error: function(){
    }
  });
}
const updateArticleClicksSucc = (data, dom) => {
  const data_href = $(dom).attr('data_href')
  const target = $(dom).attr('target') === '_blank' ? '_blank' : '_self'
  window.open(data_href,target)
}