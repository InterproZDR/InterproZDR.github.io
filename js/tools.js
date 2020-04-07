
// About config:
// config是let变量，用于保存页面设置
// configNormal是当页面设置在localStorage中不存在或异常时的默认设置
const configNormal = {
    'bgPicUrl': 'https://i.loli.net/2020/03/29/E2AThbHGyFztOrQ.jpg',  // 背景图的url
    'arrowKeySwitchEngine': 'true',  // 方向键切换引擎
    'theme': 'normal-light',    // 主题
    "cleanRecordNeedy": "true"   // 按下清除键后记录上一次输入的内容，且当cleanRecord不为""时，按下config-button恢复之，且此时不打开工具栏
};
// config是页面上的设置
// config是一个对象，其中的键和值都为string.
var config;

/////////////////////////////////////////////////

function saveConfig() {
    configJSON = JSON.stringify(config);
    localStorage.setItem('config', configJSON);
}

// checkConfig() 用来加载新的加入的设置和删除老旧的设置
function checkConfig() {
    // delete old settings.
    for (i in config) {
        if (configNormal[i] == null)
            delete config[i];
    }
    // add new configs.
    for (i in configNormal) {
        if (config[i] == null)
            config[i] = configNormal[i];
    }
    saveConfig();
}

// 将config映射到其对应的元素上
function mapConfig() {
    document.getElementById('bg').setAttribute('style', 'background-image: url(' + config['bgPicUrl'] + ');');
}

// 初始化
function configInit() {
    this.console.log('Initing...');

    var configJSON = localStorage.getItem('config');

    if (configJSON == null)
        restituteConfig();
    else {
        // checkConfig() 用来加载新加入的设置和删除老旧的奢侈
        config = JSON.parse(configJSON);
        checkConfig();
        // TODO: toolbox的加载
    }
    mapConfig();
    this.console.log('The config and the elements to which is refered by config has been inited.');
}

// 还原默认设置
function restituteConfig() {
    console.log('Restitute config.');
    config = configNormal;
    saveConfig();
    mapConfig();
}

// TODO: 显示工具窗口
function showToolbox() {

}

// TODO: 隐藏工具窗口
function hideToolbox() {
    
}

// config-button的点击事件
function configButton_click() {
    var sb = document.getElementById('schbox');
    if (config['cleanRecordNeedy'] == 'true' && cleanRecord != "" && sb.value == "") {
        sb.value = cleanRecord;
        sb.focus();
        if (navigator.userAgent.indexOf('Firefox')) {
          document.getElementById('schbox').style.background = "";
        }
        cleanRecord = "";
        document.getElementById('clean-line').style.width = "488px";
        return;
    }
    showToolbox();
}