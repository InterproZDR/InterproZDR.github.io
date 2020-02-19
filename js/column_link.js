
/* column_link.js：用于存放处理侧边栏链接的相关任务的函数 */

function addLink_click(){
  closeDialog();  // init the dialog.
  onEdit = false;
  onEditID = -114514;
  showDialog();
}

function editLink_click(edited_id){
  closeDialog();  // init the dialog.
  onEdit = true;
  onEditID = edited_id;
  document.getElementById('dialog-linkname-input').value = link_list[onEditID][0];
  document.getElementById('dialog-linkurl-input').value = link_list[onEditID][1];
  showDialog();
}

/* 我已经完全爱上Warma啦！*/
