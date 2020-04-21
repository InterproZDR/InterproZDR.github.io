
/* 主页面上的javascript文件 */

let titles = ['Jump to anywhere！', '咦？你去哪儿啦？', 'biu~'];
let welcomeBackTitle = '欢迎回来！(〃\'▽\'〃)';
let normalTitle = '弹跳板主页';
let VCtimeout = null;

/////////////////////////////////////////////////

// 离开页面后随机标题
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState == 'hidden'){
    document.title = titles[Math.floor(Math.random() * Object.keys(titles).length)];
    if (VCtimeout != null) {
      clearTimeout(VCtimeout);
      VCtimeout = null;
    }
  } else{
    document.title = welcomeBackTitle;
    VCtimeout = setTimeout(function () { document.title = normalTitle }, 1000);
  }
});

// Init here
window.onload = function () {
  configInit();
  favoritesInit();
  forFirefox();
  // 检测鼠标滚轮事件
  if (document.addEventListener) {
    document.addEventListener('mousewheel', window_onmousewhell);
  } else {
    document.write('您的浏览器内核版本太低，请更新浏览器。<br/>推荐使用Firefox、Chrome或者最新的Microsoft Edge浏览器。<br/>小破站感谢您的光临。');
  }
  // 像Firefox这样的浏览器在刷新页面之后会回复在输入框中的内容
  // 这时候需要检测一下schbox的内容以改变clean-line
  if (document.getElementById('schbox').value != "")
    document.getElementById('clean-line').style.width = "488px";
  else
    document.getElementById('clean-line').style.width = "0px";
}

// 兼容火狐
function forFirefox() {
  var agnt = navigator.userAgent;
  if (agnt.indexOf('Firefox') != -1) {
    const bg = "rgba(255, 255, 255, 0.3)";
    var sb = document.getElementById('schbox');
    sb.style.backgroundColor = bg;
    sb.onmouseenter = function () {
      this.style.backgroundColor = "";
    }
    sb.onmouseleave = function () {
      if (document.activeElement != this)
        this.style.backgroundColor = bg;
    }
    sb.onblur = function () {
      this.style.backgroundColor = bg;
      document.getElementById('clean-button').style.boxShadow = "";
    }
    document.addEventListener('DOMMouseScroll', window_onmousewhell);
  }
}

// 检测鼠标滚轮事件
function window_onmousewhell() {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  var d = e.wheelDelta || e.detail;
  var dir;
  // 有些鼠标的滚轮可以向左推或者向右推，这时候要避免处理成切换两次。
  if (d == 480 || d == -480)
    return;
  dir = d > 0 ? -1 : 1;
  if (navigator.userAgent.indexOf('Firefox') != -1)
    dir = -dir;
  changeEngine(dir);
}