/**
 * 首页菜单展示
 * @param state
 * @returns {{menus}}
 */
import {openNotification} from "../../common/commonFunction";
import {FetchFailure, FetchIng, FetchSuccess} from "./ChangePasswordAction";
import {hashHistory} from 'react-router'


/**
 * 可以进行改造，多传两个参数，一个是成功的action，一个是失败的action，这样就能做成通用方法了，利用reduce统一管理
 * @param url
 * @param body
 * @returns {function(*)}
 */


//提供初始值
export const initState ={
    loading:false
};

//计算新状态
export const ChangePasswordReducer = (state = initState, action) => {
    // console.log("CommonReducer" + JSON.stringify(action) + JSON.stringify(state));
    switch (action.type) {
        case FetchIng.type: {
                return {
                    loading:true
                };
            }
        case FetchSuccess.type: {
            // openNotification(action.data.message,"",1);
            // hashHistory.push("login");
            // this.context.router.push("login")
            // location.hash("login");
            return {
                logoutFlag:true,
                loading:false
            };
        }
        case FetchFailure.type: {
            openNotification(action.data.message,"",1);
            return {
                loading:false
            };
            }
        default :
            return state;
    }
};