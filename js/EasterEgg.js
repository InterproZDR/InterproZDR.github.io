
// var......varma?
var click_times = 0;

function EasterEgg(){
  ++click_times;
  if (click_times % 10 == 0){
    switch(Math.ceil(Math.random() * 8)){
      case 1:
        alert('You successfully find the easter egg!');
        break;
      case 2:
        console.log('我没想到warma原来是五位数uid！？');
        window.open('https://space.bilibili.com/53456');
        break;
      case 3:
        window.open('https://space.bilibili.com/22942209');
        break;
      case 4:
        alert('彩蛋的这里还没想好写什么\n不如……你先退出去一下，等我想好了你再进来？');
        break;
      case 5:
        alert('有蜘蛛！啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊……');
        break;
      case 6:
        window.open('http://i0.hdslb.com/bfs/archive/06477af6913686a495a49d9e2fa936af7f712d72.jpg@203w_127h_1e_1c.webp');
        break;
      case 7:
        alert('你可以试着先切出去，然后看看这个网页的标题');
        break;
    }
  }
}
/* 我已经完全爱上Warma啦！*/
