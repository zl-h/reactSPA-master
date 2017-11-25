
export const LanguageActionHead = "102";
//表格点击增加按钮动作
export const addRowForIndexUser = {
    type:LanguageActionHead + '100001',
    remark:'表格点击增加按钮动作'
}

//表格点击编辑按钮动作
export const editRowForIndexUser = {
    type:LanguageActionHead + '100002',
    remark:'表格点击编辑按钮动作'
}

//表格点击保存及取消修改触发动作
export const saveOrCancleRowForIndexUser = {
    type:LanguageActionHead + '100003',
    remark:'表格点击保存及取消修改触发动作'
}

//单元格数值变化触发
export const changeCellForIndexUser = {
    type:LanguageActionHead + '100004',
    remark:'单元格数值变化触发'
}

//点击save和edit触发
export const dealCellAction = {
    type:LanguageActionHead + '100005',
    remark:'点击save和edit触发'
}

//点击delete触发
export const dealCellActionDelete = {
    type:LanguageActionHead + '100006',
    remark:'点击delete触发'
}

//点击selectAll触发
export const SelectAllAction = {
    type:LanguageActionHead + '100007',
    remark:'点击selectAll触发'
}