/**
 * 首页菜单展示
 * @param state
 * @returns {{menus}}
 */
import { fetchActionFailure, fetchActionLoading, fetchActionSuccess} from "./LanguagecommonAction";
import {openNotification} from "../../page/common/commonFunction";

//提供初始值
export const initState ={
    menus:[]
};
//计算新状态
export const operateReducer = (state = initState, action) => {
    // console.log("operateReducer" + JSON.stringify(state));
    switch (action.type) {
        case fetchActionLoading.type:
            return {
                menus: initState.menus
            };
        case fetchActionSuccess.type:{
            return {
                menus: action.data.data
            }
        }
        case fetchActionFailure.type:
            openNotification("提示","菜单请求失败",4);
            return {
                menus: initState.menus
            };
        case "asdasd":
            alert("请求失败");
            return {
                menus: "456"
            };
        default :
            return state;
    }
};
