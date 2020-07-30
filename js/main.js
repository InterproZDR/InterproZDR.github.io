var searchorList = Array();
var searchorIndex = 0;
let searchorSelectionStatue = "HIDE";

var vue_timeHours, vue_timeMinutes;
var vue_searchorInput;  // 输入框
var vue_cleanLineBody;  // 清除线
var vue_searchorLenovo; // 联想

const databasePrefix = "SPRING-PLATE-";
const urlAgreements = ["https://", "file://", "http://", "ftp://"];

var titles = ['你去哪里啦？', '多冷啊，我在东北玩泥巴', '页面出现错误！（误）'];
var welcomeBackTitle = '欢迎回来！(〃\'▽\'〃)';
var normalTitle = '麻雀小起始页';
let VCtimeout = null;

class searchor{
    searchorLink = "";
    searchorNone = "";
    _vue = undefined;
    constructor(searchorLink, searchorNone) {
        this.searchorLink = searchorLink;
        this.searchorNone = searchorNone;
    }
    getJSON() {
        return "{searchorLink:\"" + this.searchorLink + "\",searchorNone:\"" + this.searchorNone + "\",title:\"" + title + "\"}";
    }
    praseJSON(JSONcode) {
        var searchorData = JSON.prase(JSONcode);
        this.praseMap(searchorData);
    }
    praseMap(datamap) {
        this.searchorLink = datamap["searchorLink"];
        this.searchorNone = datamap["searchorNone"];
    }
}

setInterval(function () {
    var dt = new Date();
    vue_timeHours.hours = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
    vue_timeMinutes.minutes = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
}, 1000);

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

window.onload = function () {
    databaseLoad();
    eventsLoad();
    vueLoad();
    console.log("Loaded.");
    console.log("本起始页暂未完成.");
    console.log("大佬做的起始页：https://a.maorx.cn");
    console.log("大佬做的起始页：https://a.maorx.cn");
    console.log("大佬做的起始页：https://a.maorx.cn");
};

window.baidu = {
    sug: function (json) {
        vue_searchorLenovo.lenovoText = [];
        if (json["g"] == undefined || Object.keys(json["g"]).length == 0)
            return;
        for (var i = 0; i < Object.keys(json["g"]).length; ++i){
            vue_searchorLenovo.lenovoText.push({ text: json["g"][i]["q"] });
        }
    }
}

function databaseLoad() {
/*    var bookmarkData = JSON.parse(databaseGet("bookmarkList"));
    var searchorData = JSON.parse(databaseGet("searchorList"));
    if (searchorData == undefined) {
        searchorData = {}
    }*/
    // 咕咕咕
    searchorList = Array();
    searchorList.push(new searchor("https://www.baidu.com/s?wd=%s", "https://www.baidu.com/"));
    searchorList.push(new searchor("https://cn.bing.com/search?q=%s", "https://cn.bing.com/"));
    searchorList.push(new searchor("https://search.bilibili.com/all?keyword=%s", "https://www.bilibili.com/"));
    searchorList.push(new searchor("https://www.acfun.cn/search?keyword=%s", "https://www.acfun.cn/")); 
    searchorList.push(new searchor("https://zh.moegirl.org/index.php?search=%s", "https://zh.moegirl.org/Mainpage"));
    searchorList.push(new searchor("https://translate.google.cn/#view=home&op=translate&sl=auto&tl=en&text=%s", "https://translate.google.cn/"));
    document.getElementById("searchor-selector").style.backgroundImage = "url(" + cutFaviconUrl(searchorList[0]["searchorNone"]) + ")";
}

/*function databaseGet(name) {return localStorage.getItem(databasePrefix + name);}function databaseSave(name, val) {localStorage.setItem(databasePrefix + name, val);}function databaseRemove(name) {localStorage.removeItem(databasePrefix + name);}*/

function eventsLoad() {
    document.documentElement.onkeydown = documentElement_onkeydown;
    document.getElementById("searchor-selector").onclick = searchorSelector_onclick;
    document.getElementById("searchor-search").onclick = search;
    document.getElementById("searchor-input").onkeydown = searchorInput_onkeydown;
    document.onclick = function () {
        searchorSelectionHide();
    }
    document.getElementById("searchor-selection-window").onclick = function () {
        var e = event || window.event;
        e.stopPropagation();
    }
}

function vueLoad() {
    vue_timeHours = new Vue({
        el: "#time-hours",
        data: {
            hours: 23
        }
    });
    vue_timeMinutes = new Vue({
        el: "#time-minutes",
        data: {
            minutes: 33
        }
    });
    vue_searchorInput = new Vue({
        el: "#searchor-input",
        data: {
            text: ""
        }
    });
    vue_cleanLineBody = new Vue({
        el: "#clean-line-body",
        data: {
            clbStyle: {
                opacity: "0%",
                cursor: "default"
            }
        }
    });
    vue_searchorLenovo = new Vue({
        el: "#searchor-lenovo",
        data: {
            lenovoText: []
        }
    });
    // TODO: 把非Vue代码改成Vue代码
    var slist = document.getElementById("searchor-selection-list");
    for (var i = 0; i < Object.keys(searchorList).length; ++i){
        var smonomer = searchorList[i];
        var sdom = document.createElement("div");
        sdom.classList += "searchor-monomer";
        sdom.setAttribute("style", "background-image:url(" + cutFaviconUrl(smonomer["searchorLink"]) + ")");
        sdom.onclick = searchorMonomer_onclick;
        sdom.id = "searchor-monomer-" + i;
        sdom.title = smonomer["searchorNone"];
        slist.appendChild(sdom);
    }
}

function documentElement_onkeydown(e) {
    document.getElementById('searchor-input').focus();
}

function cutFaviconUrl(source) {
    var res = "", slashCount = 0;
    for (var i = 0; i < Object.keys(source).length; ++i){
        if (source[i] == "/" && ++slashCount >= 3)
            break;
        res += source[i];
    }
    return res + "/favicon.ico";
}

function searchorSelector_onclick() {
    if (searchorSelectionStatue == "OPEN") {
        window.open(searchorList[searchorIndex].searchorNone);
        searchorSelectionHide();
    }
    else
        searchorSelectionOpen();
    (event || window.event).stopPropagation();
}

function searchorMonomer_onclick() {
    searchorSelectionHide();
    searchorIndex = 0;
    for (var i = Object.keys(this.id).length - 1; this.id[i] * 1 >= 0 && this.id[i] <= 9; --i){
        searchorIndex = this.id[i] * 1 + searchorIndex * 10;
    }
    document.getElementById("searchor-selector").style.backgroundImage = "url(" + cutFaviconUrl(searchorList[searchorIndex]["searchorNone"]) + ")";
}

function searchorSelectionHide() {
    document.getElementById("searchor-selection-window").style.display = "none";
    searchorSelectionStatue = "HIDE";
}

function searchorSelectionOpen() {
    document.getElementById("searchor-selection-window").style.display = "";
    searchorSelectionStatue = "OPEN";
}

function searchorInput_onkeydown() {
    var e = event || window.event;
    if (e) {
        var key = e.keyCode;
        if (key == 13 || key == 10)
            search();
    }
    if (vue_searchorInput.text != "") {
        vue_cleanLineBody.clbStyle.opacity = "100%";
        vue_cleanLineBody.clbStyle.cursor = "pointer";
    }
    else {
        vue_cleanLineBody.clbStyle.opacity = "0%";
        vue_cleanLineBody.clbStyle.cursor = "default";
    }
    updateBaidu();
}

function updateBaidu() {
    try {
        if (document.getElementById("lenovo"))
            document.getElementsByTagName("head")[0].removeChild(document.getElementById("lenovo"));
        if (vue_searchorInput.text == "") {
            vue_searchorLenovo.lenovoText = [];
            return;
        }
    }
    catch (e) {
        console.error(e);
    }
    var newBaidu = document.createElement("script");
    newBaidu.id = "lenovo";
    newBaidu.type = "text/javascript";
    newBaidu.src = ("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=%s&json=1").replace("%s", vue_searchorInput.text);
    document.getElementsByTagName("head")[0].appendChild(newBaidu);
    
}

function search() {
/*    var text = document.getElementById("searchor-input").value;*/
    var text = vue_searchorInput.text;
    if (text == "") {
        window.open(searchorList[searchorIndex].searchorNone);
        return;
    }
    for (var i = Object.keys(urlAgreements).length - 1; i >= 0; --i) {
        if (text.indexOf(urlAgreements[i]) == 0) {
            window.open(text);
            return;
        }
    }
    window.open(searchorList[searchorIndex].searchorLink.replace("%s", text));
}

function cleanLineBody_onclick() {
    if (vue_cleanLineBody.clbStyle.opacity != "0%") {
        vue_searchorInput.text = "";
        vue_cleanLineBody.clbStyle.opacity = "0%";
        vue_cleanLineBody.clbStyle.cursor = "default";
    }
    updateBaidu();
}

function searchorLenovoMonomoer_click(altText) {
    vue_searchorInput.text = altText;
    updateBaidu();
}