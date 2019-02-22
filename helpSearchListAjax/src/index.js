
import './header.less';
import './pagination.less';
import './index.less';
import './iconfont.css';
import $ from './jquery-vendor.js'
import pagination from 'paginationjs'
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
  const urlParams = GetRequest()
  $('.content-search_keywords .keywords').html('"'+urlParams.searchStr+'"')
  $('#newSearchBox-input').val(urlParams.searchStr)
  paginationFun(urlParams)
  // search 事件
  document.getElementById('icon-search').onclick = () => {
    let val = $('#newSearchBox-input').val()
    window.location.href =  window.location.origin+'?pcolumnId=' +urlParams.pcolumnId+'&searchStr='+val
  }
  document.getElementById('icon-search').onclick = () => {
    let searchStr = $('#newSearchBox-input').val()
    let searchUrl = $('#icon-search').attr('searchUrl')
    let pcolumnId = $('#icon-search').attr('pcolumnId')
    console.log(searchUrl+'?pcolumnId=' +pcolumnId+'&searchStr='+searchStr)
    window.location.href =  searchUrl+'?pcolumnId=' +pcolumnId+'&searchStr='+searchStr
  }
}
const template = (data,urlParams) => {
  $('#content-html .content-search_list').html('');
  let str = '';
  if (data.length) {
    $('#noData').css('display', 'none');
    data.map(item => {
      str += '<li>' +
                '<a href="' + item.articleUrl + '">' +
                  '<p class="content-search_title">' +
                    replaceFun(urlParams.searchStr,item.articleTitle) +                 
                  '</p>' +
                  '<p class="content-search_detail">' + item.articleAbstract + '</p>' +
                '</a>' +
              '</li>'
    })
  } else {
    $('#noData').css('display', 'block');
    $('#pagination-container').css('display', 'none');
  }
  return str
}
const replaceFun = (str,data) => {
  let searchStr = str.toUpperCase()
  let dataEd = data.toUpperCase()
  let index = dataEd.indexOf(searchStr)
  let length = searchStr.length
  let returnData = data.replace(data.substr(index,length),'<span class="keywords">'+data.substr(index,length)+'</span>')
  return returnData
}
// 分页数据处理
const paginationFun = (urlParams) => {
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
      }, // 参数
      dataType: 'jsonp'
    },
    callback: (data, pagination) => {
      let html = template(data,urlParams);
      $('#content-html .content-search_list').html(html);
      $('#loadEffectBox').css('display', 'none');
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