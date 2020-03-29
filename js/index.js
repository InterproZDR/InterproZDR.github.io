
/* 主页面上的javascript文件 */

let titles = ['嗯，你快回来呀(*／ω＼*)', '嗯？你去哪儿啦？', '呜，你不要伦家了吗'];
let welcomeBackTitle = '欢迎回来！(〃\'▽\'〃)';
let normalTitle = 'Outpro\'s Frontpage!';

// 离开页面后随机标题
document.addEventListener('visibilitychange', function(){
  if (document.visibilityState == 'hidden'){
    document.title = titles[Math.floor(Math.random() * Object.keys(titles).length)];
  }
  else{
    document.title = welcomeBackTitle;
    setTimeout(function () { document.title = normalTitle }, 1000);
  }
});

class Engine{
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

var engineList = [null, 
  new Engine('谷歌', 'https://www.google.com/search?q=%s&oq=%s&ie=UTF-8', 'https://www.google.com/'),
  new Engine('百度', 'https://www.baidu.com/s?wd=%s', 'https://www.baidu.com/'),
  new Engine('必应', 'https://cn.bing.com/search?q=%s', 'https://cn.bing.com/'),
  new Engine('B站', 'https://search.bilibili.com/all?keyword=%s&from_source=banner_search', 'https://www.bilibili.com'),
  new Engine('萌百', 'https://zh.moegirl.org/index.php?search=%s', 'https://zh.moegirl.org/Mainpage'),
  new Engine('翻译', 'https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=%s', 'https://translate.google.cn/')];
var eChangeDelay = 150;     // 改变引擎的延迟（var用于调戏）
let engine = 2;             // engine:当前使用的引擎的编号
let reloadInterval, reloadTimeout, eChangeDirection;

// 自被选中的引擎（即engine所指）向左或向右数abs(i)个引擎。i>0表示向右，i<0表示向左（引擎按编号顺序排在数轴上就有了前面的左和右）
function getNearbyEngine(i){
  if (engine + i <= 0)
    return Object.keys(engineList).length - 1;
  else if (engine + i > Object.keys(engineList).length - 1)
    return 1;
  else
    return engine + i;
}

// 延时函数
function sleep(delay){
  var start = (new Date()).getTime();
  while ((new Date).getTime() - start < delay){
    continue;
  }
}

// 改变引擎
function changeEngine(){
  engine += eChangeDirection;
  if (engine <= 0)
    engine = Object.keys(engineList).length - 1;
  if (engine > Object.keys(engineList).length - 1)
    engine = 1;
  var le = getNearbyEngine(-1), mid = getNearbyEngine(0), ri = getNearbyEngine(1);
  document.getElementById('e-left').innerHTML = engineList[le].name;
  document.getElementById('e-middle').innerHTML = engineList[mid].name;
  document.getElementById('e-right').innerHTML = engineList[ri].name;
}

// 鼠标按下#e-left或#e-right
function btn_mousedown(dir){
  eChangeDirection = dir;
  // 先切换一次，等eChangeDelay后再开始自动切换
  changeEngine();
  reloadTimeout = setTimeout(function(){
    reloadInterval = setInterval(changeEngine, eChangeDelay);
  },eChangeDelay * 1.7);
}

// 关闭自动切换
function stopAutoChange(){
  clearInterval(reloadInterval);
  clearTimeout(reloadTimeout);
  reloadInterval = undefined;
  reloadTimeout = undefined;
}

// 处理输入框的按键的函数，主要处理按下的回车键
function schboxKeydown(){
  if (window.event){
    var key = window.event.keyCode;
    if (key == 13 || key == 10)
      search();
    else if (key == 38)
      lbtn_click();
    else if (key == 40)
      rbtn_click();
    else if (document.getElementById('schbox').value == ''){
      if (key == 37)
        lbtn_click();
      else if (key == 39)
        rbtn_click();
    }
  }
}

// 获取将要打开的新页面的url
function getTargetUrl(altrnatingText){
  if (altrnatingText == '')
    return engineList[engine].searchnan;
  else
    return engineList[engine].searchto.replace('%s', altrnatingText);
}

// 搜索并打开新页面
function search(){
  var schbox = document.getElementById('schbox');
  var url = getTargetUrl(schbox.value);
  window.open(url);
}

// 被选中的引擎被点击
function e_middle_click(){
  window.open(engineList[engine].searchnan);
}

// 清空输入框的内容
function clean(){
  var schbox = document.getElementById('schbox');
  schbox.value = "";
  schbox.focus();
}

// 沃玛！！！
function Warma(){
  document.getElementById('schbox').value = 'Warma';
}
function warma() {
  document.getElementById('schbox').value = 'Warma';
}

// 沃尔玛（误）
/* 我已经完全爱上Warma啦！*/
