
class Engine {
  name;       // 引擎名
  searchto;   // 有输入时跳转页面
  searchnan;  // 默认跳转页面
  constructor(name, searchto, searchnan) {
    this.name = name;
    this.searchto = searchto;
    this.searchnan = searchnan;
  }
  // 转换为JSON格式
  // 返回值为JSON数组
  toJSON() {
    return "{\'name\': \'" + name + "\', \'searchto\': \'" + searchto + "\', \'searchnan\': \'" + searchnan + "\'}";
  }
}

const netAgreements = ['http://', 'https://', 'ftp://', 'file:///'];

var engineList = [null, 
  new Engine('谷歌', 'https://www.google.com/search?q=%s&oq=%s&ie=UTF-8', 'https://www.google.com/'),
  new Engine('百度', 'https://www.baidu.com/s?wd=%s', 'https://www.baidu.com/'),
  new Engine('必应', 'https://cn.bing.com/search?q=%s', 'https://cn.bing.com/'),
  new Engine('知乎', 'https://www.zhihu.com/search?type=content&q=%s', 'https://www.zhihu.com/'),
  new Engine('A站', 'https://www.acfun.cn/search?keyword=%s', 'https://www.acfun.cn/'),
  new Engine('B站', 'https://search.bilibili.com/all?keyword=%s&from_source=banner_search', 'https://www.bilibili.com'),
  new Engine('萌百', 'https://zh.moegirl.org/index.php?search=%s', 'https://zh.moegirl.org/Mainpage'),
  new Engine('翻译', 'https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=%s', 'https://translate.google.cn/')];
let engine = 2;     // 当前使用的引擎的编号（注意，engine不可为0）
var cleanRecord = "";// 使用删除线清除的内容

// 自被选中的引擎（即engine所指）向左或向右数abs(i)个引擎。i>0表示向右，i<0表示向左（引擎按编号顺序排在数轴上就有了前面的左和右）
function getNearbyEngine(i) {
  if (engine + i <= 0)
    return Object.keys(engineList).length - 1;
  else if (engine + i > Object.keys(engineList).length - 1)
    return 1;
  else
    return engine + i;
}

  // 改变引擎
function changeEngine(eChangeDirection) {
  engine += eChangeDirection;
  if (engine <= 0)
    engine = Object.keys(engineList).length - 1;
  if (engine > Object.keys(engineList).length - 1)
    engine = 1;
  var le = getNearbyEngine(-1), mid = getNearbyEngine(0), ri = getNearbyEngine(1);
  document.getElementById('e-left').innerHTML = engineList[le].name;
  document.getElementById('e-middle').innerHTML = engineList[mid].name;
  document.getElementById('e-right').innerHTML = engineList[ri].name;
  document.getElementById('schbox').focus();
  schbox_onclick();
}

// 主要处理schbox按下回车键
function schbox_onkeydown() {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e) {
    var key = e.keyCode;
    if (key == 13 || key == 10)
      search();
  }
}
function schbox_onkeypress() {
  if (document.getElementById('schbox').value != "")
    document.getElementById('clean-line').style.width = "570px";
  else
    document.getElementById('clean-line').style.width = "0px";
}
function schbox_onmouseover() {
  if (document.activeElement.id != 'schbox')
    document.getElementById('clean-button').style.boxShadow = "rgba(0, 139, 220, 0.616)0px 0px 4px";
}
function schbox_onmouseout() {
  if (document.activeElement.id != 'schbox')
    document.getElementById('clean-button').style.boxShadow = "";
}
function schbox_onclick() {
  document.getElementById('clean-button').style.boxShadow = "rgb(0, 140, 220) 0px 1px 3px, rgb(0, 140, 220) 0px -1px 3px";
}
function schbox_onblur() {
  document.getElementById('clean-button').style.boxShadow = "";
}

// 获取将要打开的新页面的url
// 如果altrnatingText为链接则直接返回altrnatingText
function getTargetUrl(altrnatingText) {
  for (var i = 0; i < Object.keys(netAgreements).length; ++i)
    if (altrnatingText.indexOf(netAgreements[i]) == 0)
      return altrnatingText;
  if (altrnatingText == '')
    return engineList[engine].searchnan;
  else
    return engineList[engine].searchto.replace('%s', altrnatingText);
}

// 搜索并打开新页面
function search() {
  var schbox = document.getElementById('schbox');
  var url = getTargetUrl(schbox.value);
  window.open(url);    
}

// 被选中的引擎被点击
function e_middle_click() {
  window.open(engineList[engine].searchnan);
}

function clean_line_click() {
  var sb = document.getElementById('schbox');
  if (sb.value != '')
    cleanRecord = document.getElementById('schbox').value;
  sb.value = "";
  document.getElementById('clean-line').style.width = "0px";
  document.getElementById('schbox').focus();
  schbox_onclick();
  if (navigator.userAgent.indexOf('Firefox')) {
    document.getElementById('schbox').style.background = "";
  }
}

// config-button的点击事件
function cleanButton_click() {
  var sb = document.getElementById('schbox');
  if (cleanRecord != "" && sb.value == "") {
    sb.value = cleanRecord;
    sb.focus();
    schbox_onclick();
    if (navigator.userAgent.indexOf('Firefox')) {
      document.getElementById('schbox').style.background = "";
    }
    cleanRecord = "";
    document.getElementById('clean-line').style.width = "488px";
  }
}