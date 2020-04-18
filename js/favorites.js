
const normalColor = ['#CCCC00', '#FF0033', '#CCCCCC', '#00AACC', '#222222'];
// 收藏的网站的单体
class FavorityNode{
    link;
    title;
    bgcolor;
    sons;
    constructor(link, title, bgcolor = normalColor[Math.floor(Math.random() * Object.keys(normalColor).length)]) {
        this.link = link;
        this.title = title;
        this.bgcolor = bgcolor;
        this.sons = [];
    }
    addNewSon(nlink, ntitle, nbgcolor = normalColor[Math.floor(Math.random() * Object.keys(normalColor).length)]) {
        this.sons.push(new FavorityNode(nlink, ntitle, nbgcolor));
    }
    toJSON() {
        var res;
        res = "{\'title\':\'" + this.title + "\',\'link':\'" + this.link + "\',\'color\':" + this.bgcolor + "\'";
        res += ",\'sons\':{"
        for (var s in this.sons) {
            res += s.toJSON();
        }
        res += "}";
        return res + "}";
    }
}
// 收藏夹根节点
var favorityRoot = new FavorityNode('node', './index.htm');

// 初始化
function favoritesInit() {
    
}



// 是沃玛！AWSL！