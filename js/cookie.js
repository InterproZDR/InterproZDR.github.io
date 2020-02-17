
/* cookie.js */

var link_list = Array(0);
var onEdit = false, onEditID = -114514;   // onEdit记录是否是正在编辑
const linkID_before = 'customizeLink-';   // 在每个Link的ID之前都有的前缀

window.onload = function(){load();};

function getStandardLinkID(id){
  return linkID_before + id;
}

function getEditedLinkID(){
  return linkID_before + onEditID;
}

// 从分好组的Cookie中查找变量名
function getCookie(varname, splitedCookie){
  var cookie = document.cookie.split(';');
  var name = varname + '=';
  for (var i = 0; i < cookie.length; ++i){
    var seg = cookie[i].trim();
    if (seg.indexOf(name) == 0){
      return seg.substring(name.length, seg.length);
    }
  }
  return '';
}

/* 加载cookie至页面 */
function load(){
  var siz = parseInt(getCookie('siz'));
  for (var i = 0; i < siz; ++i){
    var nname = getCookie('name' + i);
    var url = getCookie('url' + i);
    // 加入link_list中
    var newLnk = Array(2);
    newLnk[0] = nname;
    newLnk[1] = url;
    link_list.push(newLnk);
    // 加入link-box中
    var newloaf = document.createElement('div'),
        editButton = document.createElement('span'),
        name = document.createElement('a'),
        id = i;
    editButton.setAttribute('class', 'link-loaf-edit');
    editButton.setAttribute('onclick', 'editLink_click(' + id + ');');
    editButton.setAttribute('id', getStandardLinkID(id) + '-edit');
    name.innerHTML = nname;
    name.setAttribute('href', url);
    name.setAttribute('target', '_blank');
    name.setAttribute('id', getStandardLinkID(id) + '-name');
    newloaf.appendChild(name);
    newloaf.appendChild(editButton);
    newloaf.setAttribute('class', 'link-loaf');
    newloaf.setAttribute('id', getStandardLinkID(id));
    document.getElementById('link-box').insertBefore(newloaf, document.getElementById('link-loaf-add'));
  }
}

/* 保存cookie */
function save(){
  var leng = Object.keys(link_list).length;
  var date = new Date();
  date.setTime(date.getTime() + 2^30);
  var expire = 'expire=' + date.toGMTString();
  // 写入新Cookie
  document.cookie = 'siz=' + leng + ';' + expire;
  for (var i = 0; i < leng; ++i){
    document.cookie = 'name' + i + '=' + link_list[i][0] + ';' + expire;
    document.cookie = 'url' + i + '=' + link_list[i][1] + ';' + expire;
  }
}

// 向 cookie的数组 中添加链接
function addLinkToCookie(name, url){
  var newLink = Array(2);
  newLink[0] = name;
  newLink[1] = url;
  link_list.push(newLink);
  save();
}

function removeLinkInCookie(){
  var date = new Date();
  var expire = 'expires=' + date.toGMTString();
  var edit_cookieid = Object.keys(link_list).length;
  date.setTime(date.getTime() - 100000);
  link_list.splice(onEditID, 1);
  document.cookie = 'name' + edit_cookieid + '=;expire=' + date.toGMTString();
  document.cookie = 'url' + edit_cookieid + '=;expire=' + date.toGMTString();
  document.cookie = 'siz=' + Object.keys(link_list).length + ';expire=' + date.toGMTString();
  save();
}


function editLinkInCookie(name, url){
  link_list[onEditID][0] = name;
  link_list[onEditID][1] = url;
  save();
}

/*

*  *  *     ***     ******     ** **      ***
*  *  *    *   *    *    *    *  *  *    *   *
*  *  *    *****    *****     *  *  *    *****
*  *  *   *     *   *    *    *  *  *   *     *
 ** **    *     *   *     *   *  *  *   *     *

*/
