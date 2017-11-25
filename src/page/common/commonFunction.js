import { notification } from 'antd';
import {executeLanguage} from "../index/language/languageFunction";
/**
 *
 * @param url
 * @param body
 * @param fetchActionLoading
 * @param fetchActionSuccess
 * @param fetchActionFailure
 * @param bodyType body数据类型
 * @returns {function(*)}
 */
export function commonFetch(url, body,fetchActionLoading,fetchActionSuccess,fetchActionFailure,method) {
    //无奈，post提交json一直失败。。
    // let formData = new FormData();
    //用searchParams处理json
    var searchParams = new URLSearchParams();
    var count = 0;
    if(body !== null && typeof body !== "undefined"){
        Object.keys(body).forEach((key) => {
            if(body[key] !== null && body[key] !== "" && typeof body[key] !== "undefined"){
                // formData.append(key,body[key]);
                if(count === 0){
                    url = url+"?"+key+"="+body[key];
                }else {
                    url = url+"&"+key+"="+body[key];
                }
                count = count + 1;
                searchParams.set(key,body[key]);
            }
        });
    }
    return dispatch => {
        dispatch(fetchActionLoading);
        return fetch(url, {
            credentials: 'include',
            mode: "cors",
            method: 'get',
            headers: {
                // 'Accept': 'application/json, text/javascript, */*; q=0.01',
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",//"user_name="+n+"&password="+p+"&default_lang="+11
                //'Content-Type': 'application/json',//"user_name="+n+"&password="+p+"&default_lang="+11
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
            },
            cache: 'reload',
            // body: searchParams
            //JSON.stringify({"user_name":n,"password":p,"default_lang":1})
        }).then(response => {
            console.log("发起fetch请求",url,body,response);
            if (response.status === 200) {
                return response.json().then(data =>{
                    console.log('response json', data);
                    if(data.code === 0){
                        fetchActionSuccess.data = data;
                        return dispatch(fetchActionSuccess);
                    }else {
                        // 如果请求失败，是200，提示状态码并且将服务器的返回值返回让使用者自己去判断，提高灵活度
                        fetchActionFailure.status = response.status;
                        fetchActionFailure.data = response.data;
                        return dispatch(fetchActionFailure);
                    }
                });
            } else {
                // 如果请求失败，不是200，提示状态码
                return dispatch(fetchActionFailure);
            }
        }).catch(function (error) {
            // alert(error);
            console.log('Request failed', error);
            return dispatch(fetchActionFailure);
        });
    }
};

/**
 * redux 场景数据流调度中心
 * @param data
 * @param index
 * @param action
 * @returns {function(*)}
 */
export function commonExecute(data, index, action){
    console.log("进入公共处理action","data",data,"index",index,"action",action);
    //这里是中转处理，各子系统有自己的编号，通过redix处理，这里处理异步的场景
    return dispatch => {
        if(action.type.startsWith("100") === true){
            console.log("转发至语言处理函数")
            dispatch(executeLanguage(data,index, action));
            //加载用户数据
        }
        else {
            //非异步场景直接交由redux处理
            action.data = data;
            action.index = index;
            //把参数扔进去
            dispatch(action);
        }
        console.log("公共处理action结束，交由redux处理")
    }
}




//弹出提示框
/**
 *
 * @param message
 * @param description
 * @param type 1:success  2:info  3:warning 4:error
 * @param duration
 */
export function openNotification(message,description,type,duration){
    var notificationType;
    if(type === 1){
        notificationType = "success";
    }else if(type === 2){
        notificationType = "info";
    }else if(type === 3){
        notificationType = "warning";
    }else if(type === 4){
        notificationType = "error";
    }else {
        notificationType = "warning";
    }
    if(duration === null){
        duration = 2;
    }
    notification[notificationType]({
        message: message,
        description: description,
        duration:duration
    });
}

/**
 * 合并两个json
 * @param json1
 * @param json2
 * @returns {{}}
 */
export function combineJson(json1,json2) {
    var json = {};
    Object.keys(json1).forEach((item) => {
        json[item] = json1[item];
    });

    Object.keys(json2).forEach((item) => {
        json[item] = json2[item];
    });
    return json;
}

export function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    if(inputTime === null || inputTime === ""){
        date = new Date();
    }
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};

//字符串去空格
export function trim(str) {
    if(str === null || typeof str === "undefined"){
        return "";
    }
    str = str.match(/\S+(?:\s+\S+)*/);
    return str ? str[0] : '';
}

//取出cookie里的值
export function getCookieByName(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}