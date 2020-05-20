
var titles = ['Jump to anywhere！', '咦？你去哪儿啦？', 'biu~', '得得得得得得得得得得得得得得得得得'];
var welcomeBackTitle = '欢迎回来！(〃\'▽\'〃)';
var normalTitle = '弹跳板起始页';
var consoleOutputBox;       // 使用vue实现的，作用于#console-output-box的对象
var consoleOrderInput;      // 使用vue实现的，作用于#console-order-input的对象
var getKeyInJam = true;    // 用于阻塞#schbox获得焦点的变量
let VCtimeout = null;       // visibility change使用的timeout

function $(name) {
  return document.getElementById(name) || document.getElementsByClassName(name);
}

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
  consoleOutputBox = new Vue({
    el: "#console-output-box",
    data: {
      consoleOutput: [],
      lineAccount: 0
    }
  });
  console.log = consoleOutputFunc;
  console.error = consoleOutputFunc;
  console.info = consoleOutputFunc;
  databaseLoad();
  elementsLoad();
  forFirefox();
  updateTitle();
  console.log('<-------------------------------->');
  console.log('    Yeah! Welcome to Jumper!      ');
  console.log('<-------------------------------->');
}

function elementsLoad() {
  var engineChs = $("engine-walker");
  for (var i = 0; i < Object.keys(engineList).length; ++i) {
    // TODO: 使用Vue.js更新这里的代码
    var ith = document.createElement('span');
    ith.id = engineIdBefore + i;
    ith.innerHTML = engineList[i].name;
    ith.onmouseup = engine_onmouseup;
    if (i != engine) {
      ith.setAttribute("class", "engine engine-candidate");
    } else {
      ith.setAttribute("class", "engine engine-cur");
    }
    engineChs.appendChild(ith);
  }
  consoleOrderInput = new Vue({
    el: "#console-order-input",
    methods: {
      sendOrder: function () {
        var order = $("console-order-input").value;
        console.log("$User> " + order);
        $("console-order-input").value = "";
        eval(order);
      }
    }
  });
  changeEngineTo(engine);
  updateWalker();
  addAttributesToElements();
  addEventsToElements();
}

function addAttributesToElements() {
  // TODO: 判断背景亮暗
  if (configCheck('judgeBgShade')) {
    var bg = $('bg');
    for (var i = 0; i < Object.keys(engineList).length; ++i) {
      getEngineElement(i).classList.add("text-stroker");
    }
  }
}

function addEventsToElements() {
  document.documentElement.onpaste = documentElement_onpaste;
  document.documentElement.onkeydown = documentElement_onkeydown;
  $('all-event-listener').onmousewheel = allEventListener_onmousewhell;
  $('all-event-listener').ondblclick = allEventListener_ondblclick;
  $('engine-body').oncontextmenu = engineBody_oncontextmenu;
  $('engine-body').onmouseenter = engineBody_onmouseenter;
  $('engine-body').onmouseleave = engineBody_onmouseleave;
  $('engine-body').onmousewheel = allEventListener_onmousewhell;
  $('engine-editor-cancel').onclick = engineEditorCancle_onclick;
  $('engine-editor-sure').onclick = engineEditorSure_onclick;
  $('search').onmousewheel = allEventListener_onmousewhell;
  $('reduction-button').onclick = reductionButton_click;
  $('schbox').onpaste = schbox_onpaste;
  $('schbox').onkeydown = schbox_onkeydown;
  $('schbox').onkeyup = schbox_onkeyup;
  $('search-button').onclick = search;
  $('clean-line-clickeder').onclick = cleanLine_click;
}

// 兼容火狐
function forFirefox() {
  var agnt = navigator.userAgent;
  if (agnt.indexOf('Firefox') != -1) {
    document.addEventListener('DOMMouseScroll', allEventListener_onmousewhell);
  }
}

/***************************************************/
/********************* Events **********************/
/***************************************************/

var engineChsEntered = false;
var engineSelected = -1;

// 控制台输出函数
function consoleOutputFunc(text) {
  consoleOutputBox.consoleOutput.push({ lineNum: ++consoleOutputBox.lineAccount, output: text, isUser: text.indexOf("$User> ") == 0});
}

function documentElement_onkeydown(e) {
  if (!getKeyInJam)
    $('schbox').focus();
}

function documentElement_onpaste(e) {
  $('clean-line').style.width = cleanLineNormalWidth + "px";
}

function allEventListener_onmousewhell() {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  var d = e.wheelDelta || e.detail;
  var dir;
  dir = d > 0 ? -1 : 1;
  if (navigator.userAgent.indexOf('Firefox') != -1) {
    dir = -dir;
  }
  changeEngineTo(enlegalEngineIndex(engine + dir));
  $('schbox').focus();
}

function allEventListener_ondblclick() {
  // TODO: 创建新便笺
}

// 在#engine-body上右键开启引擎编辑器
function engineBody_oncontextmenu(e) {
  return;  // 暴力隐藏未开发完成的内容
  if (e.button == 2) {
    var ee = $('engine-editor');
    engineEditorShow(e);
    e.preventDefault();
  }
}

// 这两个函数用于，在鼠标移入/移出时，更新选中引擎两边的引擎的透明度
function engineBody_onmouseenter() {
  engineChsEntered = true;
  engineUpdateNearBy("100%");
}
function engineBody_onmouseleave() {
  engineChsEntered = false;
  engineUpdateNearBy("70%");
}

function engine_onmouseup(e) {
  var btn = e.button;
  if (btn == 2) {
    return;// 暴力隐藏未开发完成的内容
    var ee = $('engine-editor');
    e.preventDefault();
    engineEditorShow(e);
  } else if (btn == 0) {
    if (this.id.substring(engineIdBefore.length) * 1 == engine) {
      window.open(engineList[engine].searchnan);
    }
    else {
      changeEngineTo(this.id.substring(engineIdBefore.length) * 1);
      $('schbox').focus();
    }
  }
}

// 引擎编辑器确定按钮
function engineEditorSure_onclick() {
  engineEditorClose();
}

// 引擎编辑器取消按钮
function engineEditorCancle_onclick() {
  engineEditorClose();
}

// schbox的系列事件
function schbox_onpaste() {
  $('clean-line').style.width = cleanLineNormalWidth + "px";
}
function schbox_onkeydown() {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e) {
    var key = e.keyCode;
    if (key == 13 || key == 10)
      search();
  }
}
function schbox_onkeyup() {
  if ($('schbox').value != "") {
    $('clean-line').style.width = cleanLineNormalWidth + "px";
  }
  else {
    $('clean-line').style.width = "0px";
  }
}

// 左侧的恢复按钮的点击事件
function reductionButton_click() {
  var sb = $('schbox');
  if (cleanRecord != "" && sb.value == "") {
    sb.value = cleanRecord;
    sb.focus();
    if (navigator.userAgent.indexOf('Firefox')) {
      sb.style.background = "";
    }
    cleanRecord = "";
    $('clean-line').style.width = cleanLineNormalWidth + "px";
  }
}

// 点击清除线
function cleanLine_click() {
  var sb = $('schbox');
  if (sb.value != '') {
    cleanRecord = sb.value;
  }
  sb.value = "";
  $('clean-line').style.width = "0px";
  $('schbox').focus();
  if (navigator.userAgent.indexOf('Firefox')) {
    $('schbox').style.background = "";
  }
}

function updateTitle() {
  document.title = normalTitle + " - " + engineList[engine].name;
}

// 显示引擎编辑器
function engineEditorShow(e) {
  var ee = $('engine-editor');
  ee.classList.remove("window-editor-hidden");
  ee.classList.add("window-editor-shown");
  ee.style.left = e.clientX + 20 + "px";
  ee.style.top = (e.clientY - ee.offsetHeight / 2) + "px";

}

// 关闭引擎编辑器
function engineEditorClose() {
  $('engine-editor').classList.remove("window-editor-shown");
  $('engine-editor').classList.add("window-editor-hidden");
}

function windowBoxShow() {
  getKeyInJam = true;
  $("window-box").setAttribute("style", "display: flex");
}