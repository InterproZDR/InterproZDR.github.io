
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
  toJSON() {
    return '{\"name\":\"' + this.name + '\",\"searchto\":\"' + this.searchto + '\",\"searchnan\":\"' + this.searchnan + '\"}';
  }
}
const engineIdBefore = "engine";
var engine = 2;     // 当前使用的引擎的编号（注意，engine不可为0）
var cleanRecord = "";// 使用删除线清除的内容
let _walkerUpdateTimeout = null;

// 返回合法的i（如果i小于等于0则返回1， 如果i大于等于Object.keys(engineList).length则返回Object.keys(engineList).length-1
function enlegalEngineIndex(i) {
  return i < 0 ? 0 : i >= Object.keys(engineList).length ? Object.keys(engineList).length - 1 : i;
}

// 获取将要打开的新页面的url
// 如果altrnatingText为链接则直接返回altrnatingText
function getTargetUrl(altrnatingText) {
  for (var i = 0; i < Object.keys(netAgreements).length; ++i) {
    if (altrnatingText.indexOf(netAgreements[i]) == 0) {
      return altrnatingText;
    }
  }
  if (altrnatingText == '') {
    return engineList[engine].searchnan;
  }
  else {
    return engineList[engine].searchto.replace('%s', altrnatingText);
  }
}

// 搜索并打开新页面
function search() {
  var schbox = $('schbox');
  var url = getTargetUrl(schbox.value);
  if (configMap['autolyClear'] == true) {
    cleanRecord = schbox.value;
    schbox.value = "";
    $('clean-line').style.width = "0px";
  }
  window.open(url);
}

// 刷新engine-walker的位置
function updateWalker() {
  var left = 0;
  var walker = $('engine-walker'),
      chs = $('engine-chs'),
      e = getEngineElement(engine);
  left = e.offsetLeft + e.offsetWidth / 2;
  left = chs.offsetWidth / 2 - left;
  walker.style.left = left + "px";
}

function engineUpdateNearBy(opacity) {
  var nxt = enlegalEngineIndex(engine + 1), lst = enlegalEngineIndex(engine - 1);
  if (nxt == engine + 1) {
    getEngineElement(nxt).style.opacity = opacity;
  }
  if (lst == engine - 1) {
    getEngineElement(lst).style.opacity = opacity;
  }
}

function getEngineElement(id) {
  return $(engineIdBefore + id);
}

function changeEngineTo(index) {
  getEngineElement(engine).classList.remove("engine-cur");
  getEngineElement(engine).classList.add("engine-candidate");
  getEngineElement(index).classList.remove("engine-candidate");
  getEngineElement(index).classList.add("engine-cur");
  engineUpdateNearBy("");
  engine = index;
  databaseSaveItem('engine', String(engine));
  if (!engineChsEntered) {
    engineUpdateNearBy("70%");
  }
  updateWalker();
  if (_walkerUpdateTimeout != null) {
    clearTimeout(_walkerUpdateTimeout);
  }
  _walkerUpdateTimeout = setTimeout(() => { updateWalker(); _walkerUpdateTimeout = null; }, 340);
  updateTitle();
}