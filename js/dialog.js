
/* dialog.js用于存放处理#dialog上有关事件的函数。 */
/* 在dialog.js之前务必确保已引用cookie.js和column_link.js */

// 点击对话框上的确定按钮
// 如果处于编辑状态，则修改被编辑的链接
// 如果处于不编辑状态，则添加新链接
function dialogSureButton_click(){
  var input_name = document.getElementById('dialog-linkname-input').value;
  var input_url = document.getElementById('dialog-linkurl-input').value;
  if (onEdit){
    onEdit = false;
    var edtLnkNm = document.getElementById(getEditedLinkID() + '-name');
    edtLnkNm.innerHTML = input_name;
    edtLnkNm.href= input_link;
    editLinkInCookie();
  }
  else{
    addLinkToCookie();
  }
  closeDialog();
}

// 点击对话框右上角的删除按钮
// 如果处于编辑状态，删除编辑的链接
// 如果处于不编辑状态，视为放弃添加新链接
function dialogDeleteButton_click(){
  if (onEdit){
    document.getElementById(getEditedLinkID()).remove();
    removeLinkInCookie();
    onEdit = false;
  }
  closeDialog();
}

// 显示对话框
function showDialog(){
  document.getElementById('dialog').style.display = 'inherit';
}

// 关闭/隐藏对话框
function closeDialog(){
  document.getElementById('dialog-linkname-input').value = ''
  document.getElementById('dialog-linkurl-input').value = '';
  document.getElementById('dialog').style.display = 'none';
}
