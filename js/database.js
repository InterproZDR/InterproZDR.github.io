
// database.js是管理弹跳版数据库的框架
// database.js现在完全使用localStorge存储有关数据
// database.js的标识符命名格式：
//      1. 驼峰命名法
//      2. 库名+作用
//         如：engineLoad()、configResitute()、configNormal、publicNetAgreements
// TODO: 当database.js里的东西过多时，将database.js拆分成多个文件

function databaseLoad() {
    configDatabaseLoad();
    engineDatabaseLoad();
    mulDatabaseLoad();
}

/***************************************************/

// configNormal是当页面设置在localStorage中不存在或异常时的默认设置
const configNormal = {
    'bgPicUrl': 'https://i.loli.net/2020/03/29/E2AThbHGyFztOrQ.jpg',  // 背景图的url
    'theme': 'normal-light',        // 主题
    'judgeBgShade': true           // 自动判断背景颜色的深浅
};
const netAgreements = ['http://', 'https://', 'ftp://', 'file:///'];
const cleanLineNormalWidth = 540;
var configMap;
var engineList;     // 引擎列表

// 载入设置
function configDatabaseLoad() {
    console.log("Config loading...");
    var configJSON = localStorage.getItem('configMap');
    if (configJSON == null) {
        configRestitute();
        return;
    }
    else {
        configMap = JSON.parse(configJSON);
        configJudgeData();
    }
    configMapToElements();
    console.log('The config and the elements to which is refered by config has been inited.');
}

// configJudge() 用来加载新的加入的设置和删除老旧的设置
function configJudgeData() {
    for (i in configMap) {
        if (configNormal[i] == null)
            delete configMap[i];
    }
    for (i in configNormal) {
        if (configMap[i] == null)
            configMap[i] = configNormal[i];
    }
    configSave();
}

// 查询设置
function configCheck(key) {
    return configMap[key];
}

// 修改config的值（推荐调用configEdit()而不是手动修改）
function configEdit(key, val) {
    configMap[key] = val;
    configMapToElements();
    configSave();
}

// 保存config
function configSave() {
    configJSON = JSON.stringify(configMap);
    localStorage.setItem('configMap', configJSON);
}

// 还原默认设置
function configRestitute() {
    console.log('Restitute config.');
    configMap = configNormal;
    configSave();
    configMapToElements();
}

// 将config映射到其对应的元素上
function configMapToElements() {
    document.getElementById('bg').setAttribute('style', 'background-image: url(' + configMap['bgPicUrl'] + ');');
    if (configMap['judgeBgShade'] == 'true') {
        
    }
}

/***************************************************/

const engineListNormal = [
    new Engine('谷歌', 'https://www.google.com/search?q=%s', 'https://www.google.com/'),
    new Engine('百度', 'https://www.baidu.com/s?wd=%s', 'https://www.baidu.com/'),
    new Engine('必应', 'https://cn.bing.com/search?q=%s', 'https://cn.bing.com/'),
    new Engine('知乎', 'https://www.zhihu.com/search?q=%s', 'https://www.zhihu.com/'),
    new Engine('Acfun', 'https://www.acfun.cn/search?keyword=%s', 'https://www.acfun.cn/'),
    new Engine('Bilibili', 'https://search.bilibili.com/all?keyword=%s', 'https://www.bilibili.com'),
    new Engine('萌百', 'https://zh.moegirl.org/index.php?search=%s', 'https://zh.moegirl.org/Mainpage'),
    new Engine('翻译', 'https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=%s', 'https://translate.google.cn/')
];

function engineDatabaseLoad() {
    var engineListJSON = localStorage.getItem('engineList');
    engineList = [];
    if (engineListJSON == null) {
        engineRestitute();
    } else {
        var engineListTemp = JSON.parse(engineListJSON);
        for (key in engineListTemp) {
            engineAdd(new Engine(engineListTemp[key]["name"], engineListTemp[key]["searchto"], engineListTemp[key]["searchnan"]));
        }
        engine = localStorage.getItem('engine') * 1;
        if (engine == NaN) {
            localStorage.setItem('engine', '2');
            engine = 2;
        }
    }
    // 例如Firefox这样的浏览器在刷新页面之后会回复在输入框中的内容
    // 这时候需要检测schbox的value以判断clean-line是否要收起来
    if (document.getElementById('schbox').value != "")
        document.getElementById('clean-line').style.width = "540px";
    else
        document.getElementById('clean-line').style.width = "0px";
    console.log("Engine Loaded.");
}

function engineJudgeData() {
    
}

function engineGet(index) {
    return engineList[index];
}

function engineEdit(index, altEngine) {
    engineList[index] = altEngine;
}

function engineAdd(newe) {
    engineList.push(newe);
}

function engineRemove(index) {
    engineList.remove(index);
}

function engineRestitute() {
    engineList = engineListNormal;
    engine = 2;
    engineSave();
}

function engineSave() {
    localStorage.setItem('engineList', engineToJSON());
    localStorage.setItem('engine', String(engine));
}

function engineToJSON() {
    var engineListJSON = "{";
    for (var i = 0; i < Object.keys(engineList).length; ++i){
        engineListJSON += "\"" + String(i) + "\":" + engineList[i].toJSON();
        if (i != Object.keys(engineList).length - 1)
            engineListJSON += ",";
    }
    engineListJSON += "}";
    return engineListJSON;
}

/***************************************************/

// mul是Most used link的缩写

function mulDatabaseLoad() {
    
}

function mulAdd(link, name) {
    
}

function mulRemove(index) {
    
}

function mulEdit(index, link, name) {
    
}