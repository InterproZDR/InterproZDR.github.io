
// About config:
// config是let变量，用于保存页面设置
// configNormal是当页面设置在localStorage中不存在或异常时的默认设置
const configNormal = {
    'bgPicUrl': 'https://i.loli.net/2020/03/29/E2AThbHGyFztOrQ.jpg',  // 背景图的url
    'toolButtonMode': 'search_when_not_empty'   // tool-button的模式设置
};
let toolButton_click_account = 0;

/////////////////////////////////////////////////

window.onload = init;

/////////////////////////////////////////////////

// 初始化
function init() {
    this.console.log('Initing...');

    var configJSON = localStorage.getItem('config');

    if (configJSON == null)
        restituteConfig();
    else {
        config = JSON.parse(configJSON);
        document.getElementById('bg').setAttribute('style', 'background-image: url(' + config['bgPicUrl'] + ');');
        // TODO: toolbox的加载
    }
    this.console.log('The page has been inited.');
    
}

// 还原设置
function restituteConfig() {
    console.log('Restitute config.');
    config = configNormal;
    configJSON = JSON.stringify(config);
    localStorage.setItem('config', configJSON);
    document.getElementById('bg').setAttribute('style', 'background-image: url(' + configNormal['bgPicUrl'] + ');');
    // TODO: toolbox的加载
}

// TODO: 显示工具窗口
function showToolbox() {

}

// TODO: 隐藏工具窗口
function hideToolbox() {
    
}

// tool-button的点击事件
function toolButton_click() {
    ++toolButton_click_account;
    if (config['toolButtonMode'] == 'search_when_longtime_click') {
        // TODO: 长时间按键然后调用search()
    }
    else if (config['toolButtonMode'] == 'search_when_not_empty' &&
        document.getElementById('schbox').value != '' ||
        config['toolButtonMode'] == 'search_when_single_click') {
        search();
    }
    else {
        showToolbox();
    }
}