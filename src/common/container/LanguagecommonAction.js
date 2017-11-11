
export const LanguageActionHead = "000";
//表格点击增加按钮动作

//异步请求进行中
export const fetchActionLoading = {
    type:LanguageActionHead + 'fetchActionLoading',
    remark:'异步请求进行中'
}

//异步请求成功
export const fetchActionSuccess = {
    type:'fetchSuccess',
    remark:'异步请求成功'
}

//异步请求失败
export const fetchActionFailure = {
    type:'fetchFailure',
    remark:'异步请求失败'
}
