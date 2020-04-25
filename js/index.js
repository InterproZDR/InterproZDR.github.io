
var titles = ['Jump to anywhere！', '咦？你去哪儿啦？', 'biu~'];
var welcomeBackTitle = '欢迎回来！(〃\'▽\'〃)';
var normalTitle = '实验室里的弹跳版';//'弹跳板主页';
let VCtimeout = null;

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState == 'hidden'){
    document.title = titles[Math.floor(Math.random() * Object.keys(titles).length)];
    if (VCtimeout != null) {
      clearTimeout(VCtimeout);
      VCtimeout = null;
    }
  } else{
    document.title = welcomeBackTitle;
    VCtimeout = setTimeout(function () { updateTitle(); }, 1000);
  }
});

window.onload = function () {
  databaseLoad();
  elementsLoad();
  forFirefox();2
  updateTitle();
}

function elementsLoad() {
  var engineChs = document.getElementById("engine-walker");
  for (var i = 0; i < Object.keys(engineList).length; ++i) {
    var ith = document.createElement('span');
    ith.id = engineIdBefore + i;
    ith.innerHTML = engineList[i].name;
    if (i != engine) {
      ith.setAttribute("class", "underline engine engine-candidate");
      ith.onclick = engine_click;
    } else {
      ith.setAttribute("class", "underline engine engine-cur");
      ith.onclick = usedEngine_click;
    }
    engineChs.appendChild(ith);
  }
  changeEngineTo(engine);
  updateWalker();
  addEventsToElements();
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

// 为元素添加事件
function addEventsToElements() {
  document.getElementById('all-event-listener').onmousewheel = allEventListener_onmousewhell;
  document.getElementById('all-event-listener').ondblclick = allEventListener_ondblclick;
  document.getElementById('engine-chs').onmousedown = engineChs_onmousedown;
  document.getElementById('engine-chs').onmouseenter = engineChs_onmouseenter;
  document.getElementById('engine-chs').onmouseleave = engineChs_onmouseleave;
  document.getElementById('engine-body').onmousewheel = allEventListener_onmousewhell;
  document.getElementById('search').onmousewheel = allEventListener_onmousewhell;
  document.getElementById('reduction-button').onclick = reductionButton_click;
  document.getElementById('schbox').onpaste = schbox_onpaste;
  document.getElementById('schbox').onkeydown = schbox_onkeydown;
  document.getElementById('schbox').onkeypress = schbox_onkeypress;
  document.getElementById('search-button').onclick = search;
  document.getElementById('clean-line-clickeder').onclick = cleanLine_click;
}

/***************************************************/
/********************* Events **********************/
/***************************************************/

var engineChsEntered = false;

function allEventListener_onmousewhell() {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  var d = e.wheelDelta || e.detail;
  var dir;
  // 有些鼠标的滚轮可以向左推或者向右推，这时候要避免处理成切换两次。
  if (d == 480 || d == -480)
    return;
  dir = d > 0 ? -1 : 1;
  if (navigator.userAgent.indexOf('Firefox') != -1)
    dir = -dir;
  changeEngineTo(enlegalEngineIndex(engine + dir));
  document.getElementById('schbox').focus();
}

function allEventListener_ondblclick() {
}

function engineChs_onmousedown(e) {
  if (e == 2) {
    
  }
}

function engineChs_onmouseenter() {
  engineChsEntered = true;
  engineUpdateNearBy("100%");
}

function engineChs_onmouseleave() {
  engineChsEntered = false;
  engineUpdateNearBy("40%");
}

function schbox_onpaste() {
  var sb = document.getElementById('schbox');
  document.getElementById('clean-line').style.width = cleanLineNormalWidth + "px";
}
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
    document.getElementById('clean-line').style.width = cleanLineNormalWidth + "px";
  else
    document.getElementById('clean-line').style.width = "0px";
}

function reductionButton_click() {
  var sb = document.getElementById('schbox');
  if (cleanRecord != "" && sb.value == "") {
    sb.value = cleanRecord;
    sb.focus();
    if (navigator.userAgent.indexOf('Firefox')) {
      document.getElementById('schbox').style.background = "";
    }
    cleanRecord = "";
    document.getElementById('clean-line').style.width = cleanLineNormalWidth + "px";
  }
}

// 点击清除线
function cleanLine_click() {
  var sb = document.getElementById('schbox');
  if (sb.value != '')
    cleanRecord = document.getElementById('schbox').value;
  sb.value = "";
  document.getElementById('clean-line').style.width = "0px";
  document.getElementById('schbox').focus();
  if (navigator.userAgent.indexOf('Firefox')) {
    document.getElementById('schbox').style.background = "";
  }
}

function updateTitle() {
  document.title = normalTitle + " - " + engineList[engine].name;
}