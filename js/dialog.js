
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
    edtLnkNm.setAttribute('href', input_url);
    editLinkInCookie(input_name, input_url);
  }
  else{
    var newloaf = document.createElement('div'),
        editButton = document.createElement('span'),
        name = document.createElement('a'),
        id = Object.keys(link_list).length;
    editButton.setAttribute('class', 'link-loaf-edit');
    editButton.setAttribute('onclick', 'editLink_click(' + Object.keys(link_list).length + ');');
    editButton.setAttribute('id', getStandardLinkID(id) + '-edit');
    name.innerHTML = input_name;
    name.setAttribute('href', input_url);
    name.setAttribute('target', '_blank');
    name.setAttribute('id', getStandardLinkID(id) + '-name');
    newloaf.appendChild(name);
    newloaf.appendChild(editButton);
    newloaf.setAttribute('class', 'link-loaf');
    newloaf.setAttribute('id', getStandardLinkID(id));
    document.getElementById('link-box').insertBefore(newloaf, document.getElementById('link-loaf-add'));
    addLinkToCookie(input_name, input_url);
  }
  closeDialog();
}

// 点击对话框右上角的删除按钮
// 如果处于编辑状态，删除编辑的链接
// 如果处于不编辑状态，视为放弃添加新链接
function dialogDeleteButton_click(){
  if (onEdit){
    document.getElementById(getEditedLinkID()).remove();
    // 更新每一个链接的id
    var lnkbx = document.getElementById('link-box'), lng = lnkbx.children.length;
    var nullCount = 0;
    for (i = 0; i < lng; ++i){
      var id = lnkbx.children[i].getAttribute('id');
      if (id != null && id != 'link-loaf-add'){
        var idNumber = lnkbx.children[i].getAttribute('id').replace(/[^0-9]/ig,'');
        lnkbx.children[i].setAttribute('id', getStandardLinkID(i - nullCount));
        document.getElementById(getStandardLinkID(idNumber)+'-name').setAttribute('id', getStandardLinkID(i - nullCount) + '-name');
        document.getElementById(getStandardLinkID(idNumber)+'-edit').setAttribute('onclick', 'editLink_click(' + (i-nullCount) + ');');
        document.getElementById(getStandardLinkID(idNumber)+'-edit').setAttribute('id', getStandardLinkID(i - nullCount) + '-edit');
      }
      else{
        ++nullCount;
      }
    }
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

function dialogInputbox_onKeyDown(){
  if (window.event){
    var key = window.event.keyCode;
    if (key == 13 || key == 10)
      dialogSureButton_click();
  }
}
/* 我已经完全爱上Warma啦！*/
