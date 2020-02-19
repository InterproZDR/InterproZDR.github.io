
/* 主页面上的javascript文件 */

console.log('I have deeply fallen in love with warma.');
console.log('加油武汉，加油中国！- 坐凳人 于2020年2月15日10点46分');

var warmaSays = [ '有东西在你身后', '魂儿飞', '有蜘蛛！啊啊啊啊啊啊啊啊啊啊……', '死(kuai)亡(le)圣诞',
                  '咖啡玛', '忆雨童话故事', 'Warma好处都有啥？', '因为你是一只红苍蝇', '我想好了，你可以进来了',
                  'Warma达成百万粉丝！', '诗岸？沃玛？'];
var normalTitle="Warma Fans!!!";

document.addEventListener('visibilitychange', function(){
  if (document.visibilityState == 'hidden'){
    document.title = warmaSays[Math.floor(Math.random() * Object.keys(warmaSays).length)];
  }
  else{
    document.title = normalTitle;
  }
});

var engine = 2;// engine:当前使用的引擎的编号
var searchto = {'google' : 'https://www.google.com/search?q=%s&oq=%s&ie=UTF-8',
                'baidu' : 'https://www.baidu.com/s?wd=%s',
                'mengniang' : 'https://zh.moegirl.org/index.php?search=%s',
                'bilibili' : 'https://search.bilibili.com/all?keyword=%s&from_source=banner_search',
                'bing' : 'https://cn.bing.com/search?q=%s',
  	            'google_translate' : 'https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=%s'};
var searchnan = {'google' : 'https://www.google.com/',
                 'baidu' : 'https://www.baidu.com/',
                 'mengniang' : 'https://zh.moegirl.org/Mainpage',
                 'bilibili' : 'https://www.bilibili.com',
                 'bing' : 'https://cn.bing.com/',
                 'google_translate' : 'https://translate.google.cn/'};  // 当输入内容为空时进行“搜索”，打开的页面
var cnname = {'google' : '谷歌',
                 'baidu' : '百度',
                 'mengniang' : '萌娘',
                 'bilibili' : 'B站',
                 'bing' : '必应',
                 'google_translate' : '翻译'};
var eorder = {1 : 'google',
                2 : 'baidu',
                3 : 'bing',
                4 : 'bilibili',
                5 : 'mengniang',
                6 : 'google_translate'};

// 自被选中的引擎（即engine所指）向左或向右数abs(i)个引擎。i>0表示向右，i<0表示向左（引擎按编号顺序排在数轴上就有了前面的左和右）
function getNearbyEngine(i){
  if (engine + i <= 0)
    return Object.keys(eorder).length;
  else if (engine + i > Object.keys(eorder).length)
    return 1;
  else
    return engine + i;
}

// 点击了左数第一个引擎
function lbtn_click(){
  if (--engine <= 0)
    engine = Object.keys(eorder).length;
  var le = eorder[getNearbyEngine(-1)], mid = eorder[getNearbyEngine(0)], ri = eorder[getNearbyEngine(1)];
  document.getElementById('e-left').innerHTML = cnname[le];
  document.getElementById('e-middle').innerHTML = cnname[mid];
  document.getElementById('e-right').innerHTML = cnname[ri];
  document.getElementById('schbox').focus();
}

// 点击了右数第一个引擎
function rbtn_click(){
  if (++engine > Object.keys(eorder).length)
    engine = 1;
  var le = eorder[getNearbyEngine(-1)], mid = eorder[getNearbyEngine(0)], ri = eorder[getNearbyEngine(1)];
  document.getElementById('e-left').innerHTML = cnname[le];
  document.getElementById('e-middle').innerHTML = cnname[mid];
  document.getElementById('e-right').innerHTML = cnname[ri];
  document.getElementById('schbox').focus();
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
    return searchnan[eorder[engine]];
  else
    return searchto[eorder[engine]].replace('%s', altrnatingText);
}

// 搜索，会打开一个新页面
function search(){
  var schbox = document.getElementById('schbox');
  var url = getTargetUrl(schbox.value);
  window.open(url);
}

// 被选中的引擎被点击
function e_middle_click(){
  window.open(searchnan[eorder[engine]]);
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
// 沃尔玛（误）
/* 我已经完全爱上Warma啦！*/
