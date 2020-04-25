
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

// 返回合法的i（如果i小于等于0则返回1， 如果i大于等于Object.keys(engineList).length则返回Object.keys(engineList).length-1
function enlegalEngineIndex(i) {
  return i < 0 ? 0 : i >= Object.keys(engineList).length ? Object.keys(engineList).length - 1 : i;
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

function usedEngine_click() {
  window.open(engineList[engine].searchnan);
}

function engine_click() {
  changeEngineTo(this.id.substring(engineIdBefore.length) * 1);
  document.getElementById('schbox').focus();
}

// 刷新engine-walker的位置
function updateWalker() {
  var left = 0;
  var walker = document.getElementById('engine-walker'),
    chs = document.getElementById('engine-chs'),
    e = document.getElementById(engineIdBefore + engine);
  left = e.offsetLeft + e.offsetWidth / 2;
  left = chs.offsetWidth / 2 - left;
  walker.style.left = left + "px";
}

function engineUpdateNearBy(opacity) {
  var nxt = enlegalEngineIndex(engine + 1), lst = enlegalEngineIndex(engine - 1);
  if (nxt == engine + 1)
    document.getElementById(engineIdBefore + nxt).style.opacity = opacity;
  if (lst == engine - 1)
    document.getElementById(engineIdBefore + lst).style.opacity = opacity;
}

function changeEngineTo(index) {
  var fa = document.getElementById("engine-chs"), msx = event.clientX, msy = event.clientY;
  document.getElementById(engineIdBefore + engine).classList.remove("engine-cur");
  document.getElementById(engineIdBefore + engine).classList.add("engine-candidate");
  document.getElementById(engineIdBefore + engine).onclick = engine_click;
  document.getElementById(engineIdBefore + index).classList.remove("engine-candidate");
  document.getElementById(engineIdBefore + index).classList.add("engine-cur");
  document.getElementById(engineIdBefore + index).onclick = usedEngine_click;
  engineUpdateNearBy("");
  engine = index;
  if (!engineChsEntered)
    engineUpdateNearBy("40%");
  updateWalker();
  updateTitle();
  localStorage.setItem('engine', String(engine));
}