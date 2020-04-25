
var mulNormalColor = {
    'normal-light': '',
    'normal-dark': ''
}

// 收藏的网站的单体
class MulNode{
    link;
    title;
    bgcolor;
    constructor(link, title, bgcolor = normalColor[Math.floor(Math.random() * Object.keys(normalColor).length)]) {
        this.link = link;
        this.title = title;
        this.bgcolor = bgcolor;
    }
    toJSON() {
        var res = "{\'title\':\'" + this.title + "\',\'link':\'" + this.link + "\',\'color\':" + this.bgcolor + "\'";
        return res + "}";
    }
}
var mulList = [];

