
//语言管理查询动作
import {LanguageActionHead} from "./GroupcommonAction";

//语言管理查询异步发起请求
export const LanguageGetDataAction = {
    type:LanguageActionHead + '100100',
    remark:'语言管理查询异步发起请求'
}

//语言管理查询异步请求进行中
export const LanguageGetDataActionLoading = {
    type:LanguageActionHead + '100101',
    remark:'语言管理查询异步请求进行中'
}

//语言管理查询异步请求成功
export const LanguageGetDataActionSuccess = {
    type:LanguageActionHead + '100102',
    remark:'语言管理查询异步请求成功'
}

//语言管理查询异步请求失败
export const LanguageGetDataActionFailure = {
    type:LanguageActionHead + '100103',
    remark:'语言管理查询异步请求失败'
}

//语言管理增加动作
export const LanguageAddDataAction = {
    type:LanguageActionHead + '100104',
    remark:'语言管理增加动作'
}

//语言管理增加异步请求进行中
export const LanguageAddDataActionLoading = {
    type:LanguageActionHead + '100105',
    remark:'语言管理增加异步请求进行中'
}

//语言管理增加异步请求成功
export const LanguageAddDataActionSuccess = {
    type:LanguageActionHead + '100106',
    remark:'语言管理增加异步请求成功'
}

//语言管理增加异步请求失败
export const LanguageAddDataActionFailure = {
    type:LanguageActionHead + '100107',
    remark:'语言管理增加异步请求失败'
}

//语言管理编辑动作
export const LanguageEditDataAction = {
    type:LanguageActionHead + '100108',
    remark:'语言管理编辑动作'
}

//语言管理编辑动作异步请求进行中
export const LanguageEditDataActionLoading = {
    type:LanguageActionHead + '100109',
    remark:'语言管理编辑动作异步请求进行中'
}

//语言管理编辑动作异步请求成功
export const LanguageEditDataActionSuccess = {
    type:LanguageActionHead + '100110',
    remark:'语言管理编辑动作异步请求成功'
}

//语言管理编辑动作异步请求失败
export const LanguageEditDataActionFailure = {
    type:LanguageActionHead + '100111',
    remark:'语言管理编辑动作异步请求失败'
}



//语言管理删除动作
export const LanguagedeleteDataAction = {
    type:LanguageActionHead + '100112'
}

//语言管理删除动作异步请求进行中
export const LanguagedeleteDataActionLoading = {
    type:LanguageActionHead + '100113'
}

//语言管理删除动作异步请求成功
export const LanguagedeleteDataActionSuccess = {
    type:LanguageActionHead + '100114'
}

//语言管理删除动作异步请求失败
export const LanguagedeleteDataActionFailure = {
    type:LanguageActionHead + '100115'
}

//语言管理自定义批量增加按钮
export const LanguageMyButtonAction = {
    type:LanguageActionHead + '100116',
    remark:'语言管理自定义批量增加按钮'
}