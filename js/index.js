
var titles = ['Jump to anywhere！', '咦？你去哪儿啦？', 'biu~', '得得得得得得得得得得得得得得得得得'];
var welcomeBackTitle = '欢迎回来！(〃\'▽\'〃)';
var normalTitle = '弹跳板起始页';
let VCtimeout = null;
let engineEditorTopText;
let engineEdited = null;
let mouseDownRelativePos = { x: 0, y: 0 };
let mouseFollowInterval = null;

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
  changeEngineTo(engine);
  updateWalker();
  addAttributesToElements();
  addEventsToElements();
}

function addAttributesToElements() {
  // TODO: Judge the background is light or dark.
  if (configCheck('judgeBgShade')) {
    var bg = $('bg');
    for (var i = 0; i < Object.keys(engineList).length; ++i) {
      getEngineElement(i).classList.add("text-stroker");
    }
  }
  engineEditorTopText = new Vue({
    el: "#engine-eidtor-toptext",
    data: {
      message: "引擎修改界面"
    }
  });
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

function documentElement_onkeydown(e) {
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

function engineBody_oncontextmenu(e) {
  return;
  if (e.button == 2) {
    var ee = $('engine-editor');
    engineEditorShow(e);
    e.preventDefault();
  }
}

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
    return;
    var ee = $('engine-editor');
    e.preventDefault();
    engineEditorShow(e);
//    engineEdited = 
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

function engineEditorSure_onclick() {
  engineEditorClose();
}

function engineEditorCancle_onclick() {
  engineEditorClose();
}

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

function engineEditorShow(e) {
  var ee = $('engine-editor');
  ee.classList.remove("window-editor-hidden");
  ee.classList.add("window-editor-shown");
  ee.style.left = e.clientX + 20 + "px";
  ee.style.top = (e.clientY - ee.offsetHeight / 2) + "px";

}

function engineEditorClose() {
  $('engine-editor').classList.remove("window-editor-shown");
  $('engine-editor').classList.add("window-editor-hidden");
}