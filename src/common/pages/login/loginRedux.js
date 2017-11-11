/**
 * 首页菜单展示
 * @param state
 * @returns {{menus}}
 */
import {
    initActionFailure, initActionLoading,
    initActionSuccess, loginActionFailure, loginActionLoading, loginActionSuccess
} from "./LoginAction";
import React from 'react'
import {openNotification} from "../../../page/common/commonFunction";

//提供初始值
export const initState ={
    loading:false,
    languageList:[{"userLanguage":"","id":"0"}],
    defaultLanguage:"",
    languageDictList:[]
};

//计算新状态
export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case initActionLoading.type:
            state.loading = true;
            return {
                loading:true,
                languageList: state.languageList,
                defaultLanguage:state.defaultLanguage,
                languageDictList:state.languageDictList
            };
        case initActionSuccess.type:{
            return {
                loading:false,
                languageList: action.data.data.languageList,
                defaultLanguage:action.data.data.defaultLanguage,
                languageDictList:action.data.data.languageDictList
            }
        }
        case initActionFailure.type:{
            openNotification("提示","请求语言列表失败",4);
            return {
                loading:false,
                languageList: state.languageList,
                defaultLanguage:state.defaultLanguage,
                languageDictList:state.languageDictList
            };
        }
        case loginActionLoading.type:
            return {
                loading:true,
                languageList: state.languageList,
                defaultLanguage:state.defaultLanguage,
                languageDictList:state.languageDictList
            };
        case loginActionSuccess.type:{
            // this.props.history.push("../index");

            return {
                loginFlag:true,
                loading:false,
                languageList: state.languageList,
                defaultLanguage:state.defaultLanguage,
                languageDictList:state.languageDictList
            }
        }
        case loginActionFailure.type:
            openNotification("提示","登录失败",4);
            return {
                loading:false,
                languageList: state.languageList,
                defaultLanguage:state.defaultLanguage,
                languageDictList:state.languageDictList
            };
            return state;
        default:
            return state;
    }
};
