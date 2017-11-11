/**
 * 首页菜单展示
 * @param state
 * @returns {{menus}}
 */
import {
} from "./AuthAction";
import React from 'react'
import {AuthActionLoading} from "./AuthAction";
import {AuthActionSuccess} from "./AuthAction";
import {AuthActionFailure} from "./AuthAction";
import {openNotification} from "../../page/common/commonFunction";

//提供初始值
export const initState ={
    authFlag:0
};

//计算新状态
export const authReducer = (state = initState, action) => {
    // console.log("this",this,state,action)
    switch (action.type) {
        case AuthActionLoading.type:
        {
            return {
                authFlag:0
            }
        }
        case AuthActionSuccess.type:{
            return {
                authFlag:1
            }
        }
        case AuthActionFailure.type:{
            openNotification("提示","权限校验失败",4);
            return {
                authFlag:-1
            };
        }
        default:
            return state;
    }
};
