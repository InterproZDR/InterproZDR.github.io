
/* column_link.js：用于存放处理侧边栏链接的相关任务的函数 */

var link_list = [['本项目的github库', 'https://github.com/InterproZDR/InterproZDR.github.io']];
var onEdit = false, onEditID = -114514;   // onEdit记录是否是正在编辑
const linkID_before = 'customizeLink-';   // 在每个Link的ID之前都有的前缀
const unremoveableAmo = 3;                // 不可移除的链接的数量

function addLink_click(){
  onEdit = false;
  showDialog();
}

function editLink_click(edited_id){
  console.log(edited_id);
  onEdit = true;
  onEditID = edited_id;
  document.getElementById('dialog-linkname-input').value = link_list[onEditID][0];
  document.getElementById('dialog-linkurl-input').value = link_list[onEditID][1];
  showDialog();
}

function getEditedLinkID(){
  return linkID_before + onEditID;
}
