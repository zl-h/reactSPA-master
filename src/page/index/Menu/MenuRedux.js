/**
 * 首页菜单展示
 * @param state
 * @returns {{menus}}
 */

import {
    LanguageAddDataActionFailure, LanguageAddDataActionLoading,
    LanguageAddDataActionSuccess, LanguageEditDataActionSuccess, LanguageEditDataActionLoading,
    LanguageEditDataActionFailure, LanguageGetDataActionLoading, LanguageGetDataActionSuccess,
    LanguageGetDataActionFailure, LanguagedeleteDataActionLoading, LanguagedeleteDataActionSuccess,
    LanguagedeleteDataActionFailure, LanguageMyButtonAction
} from "./MenuAction";

import {
    addRowForIndexUser, changeCellForIndexUser, dealCellAction, dealCellActionDelete, editRowForIndexUser,
    saveOrCancleRowForIndexUser, SelectAllAction
} from "./MenucommonAction";

import {getEditableByKeyAndColumns} from "../../common/EditableTable";
import {openNotification} from "../../common/commonFunction";

/**
 * 可以进行改造，多传两个参数，一个是成功的action，一个是失败的action，这样就能做成通用方法了，利用reduce统一管理
 * @param url
 * @param body
 * @returns {function(*)}
 */


//提供初始值
export const initState ={
    data: [],
    columns :[],
    jsonData:{}
};

//计算新状态
export const MenuReducer = (state = initState, action) => {
    // console.log("CommonReducer" + JSON.stringify(action) + JSON.stringify(state));

    switch (action.type) {
        case editRowForIndexUser.type: {
                console.log("启动编辑")
                const {data, columns, jsonData,count,loading} = state;
                const {index} = action;
                Object.keys(data[index]).forEach((item) => {
                    if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                        data[index][item].editable = true;
                    }
                });
                return {
                    data: [...data],
                    columns: columns,
                    jsonData: jsonData,
                    count:count,
                    loading:loading
                };
            }
        case addRowForIndexUser.type: {
            const {data, columns, jsonData,count,loading} = state;
                var key = -1;//传到后台的key如果小于0，即非更新和修改，默认的id是大于0，则根据实际情况做插入操作
                if(addRowForIndexUser.current !== 1){
                    openNotification("提示","请在第一页完成添加行操作！",3);
                    return state;
                }
                if (data.length > 0) {
                    if (data[0].key.value < 0){
                        openNotification("提示","您有未完成的添加行！",3);
                        return state;
                    }
                }

                //增加默认为0
                const newData = {
                    key: {
                        editable: true,
                        value:key
                    }
                };
                for (var i = 0; i < columns.length; i++) {
                    var dataIndex = columns[i].dataIndex;
                    var editable = columns[i].editable;
                    newData[dataIndex] = {};
                    if (editable === true) {
                        newData[dataIndex].editable = true;
                    }
                    newData[dataIndex].value = "";
                }
                const dataResult = [newData,...data];
            return {
                data: dataResult,
                columns: columns,
                jsonData: jsonData,
                count:count,
                loading:loading
            };
            }
        case saveOrCancleRowForIndexUser.type: {
            const {data, columns, jsonData,count,loading} = state;
                var {index, type} = action.index;
                Object.keys(data[index]).forEach((item) => {
                    if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                        data[index][item].editable = false;
                        data[index][item].status = type;
                    }
                });
                return {
                    data: [...data],
                    columns: columns,
                    jsonData: jsonData,
                    count:count,
                    loading:loading
                };
            }
        case changeCellForIndexUser.type: {
            const { columns, jsonData,count,loading} = state;
                const {index, data, key, value} = action.index;
                data[index][key].value = value;
                return {
                    data: [...data],
                    columns: columns,
                    jsonData: jsonData,
                    count:count,
                    loading:loading
                };
            }
        case dealCellAction.type: {
                console.log("点击save或者edit时触发")
                var {data, columns, jsonData,count,loading} = state;
                var {index, operatetype} = action;
                Object.keys(data[index]).forEach((item) => {
                    if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                        data[index][item].editable = false;
                        data[index][item].status = operatetype;
                    }
                });
                return {
                    data: [...data],
                    columns: columns,
                    jsonData: jsonData,
                    count:count,
                    loading:loading
                };
            }
        case dealCellActionDelete.type: {
                console.log("点击删除时触发");
                //点击删除如果提交服务器则不需要触发，新增的则触发
            var {data, columns, jsonData,count,loading} = state;
                var {index} = action;
                data.splice(index, 1);
                return {
                    data: [...data],
                    columns: columns,
                    jsonData: jsonData,
                    count:count,
                    loading:loading
                };
            }
        case SelectAllAction.type:{
            var {data, columns, jsonData,count,loading} = state;
            return {
                data: [...data],
                columns: columns,
                jsonData: jsonData,
                count:count,
                loading:loading,
                selectedRowKeys:action.selectedRowKeys
            };
        }
        case LanguageMyButtonAction.type:{
            openNotification("测试自定义按钮",JSON.stringify(state.selectedRowKeys),2);
            return state;
        }
        case LanguageGetDataActionLoading.type:{
            // openNotification("提示","加载中",2);
            // alert("加载中");
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:true
            };
        }
        case LanguageGetDataActionSuccess.type:{
            // openNotification("提示","LanguageAddDataActionSuccess数据加载成功",1);
            const {count} = action.data.data;
            const dataSource = action.data.data.data.map((item) => {
                //后台必须传id，强制要求
                const obj = {};
                obj['key'] ={
                    editable: false,
                    value:item.id
                };
                Object.keys(item).forEach((key) => {
                    obj[key] = {};
                    var editable = getEditableByKeyAndColumns(key,action.data.data.columns);
                    if(editable === true){
                        obj[key].editable = false;
                    }
                    obj[key].value = item[key];
                });
                // console.log(obj);
                return obj;
            });

            var columns = [];
            action.data.data.columns.map((item) =>{
                var col = item;
/*                if(item.componentType < 100){
                    col.sorter = (a, b) => a[item.dataIndex] - b.age[item.dataIndex];
                }*/
                // console.log("col",col);
                columns = [...columns, col];
            });
            //console.log("action",action)
            return {
                columns: columns,
                data:dataSource,
                jsonData:action.data.data.jsonData,
                count:count,
                loading:false
            };
        }
        case LanguageGetDataActionFailure.type:
        {
            openNotification("提示","数据加载失败",4);
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:false
            };
        }
        case LanguageEditDataActionLoading.type:{
            /*openNotification("提示","加载中，此时data就必须更新，要获取data的值",2);
            return state;*/
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:true
            };
        }
        case LanguageEditDataActionSuccess.type:{
            // console.log("此处需要处理初始化数据");
            openNotification("提示","LanguageEditDataActionSuccess数据处理成功",1);
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:true,
                refreshFlag:true
            };
        }
        case LanguageEditDataActionFailure.type:
        {
            openNotification("提示","LanguageEditDataActionFailure数据加载失败",4);
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:false
            };
        }
        /*case LanguageAddDataActionFailure.type:
        {
            openNotification("提示","数据加载失败",5);
            return state;
        }*/
        case LanguageAddDataActionLoading.type:{
           /* openNotification("提示","加载中，此时data就必须更新，要获取data的值",2);
            return state;*/
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:true
            };
        }
        case LanguageAddDataActionSuccess.type:{
            // console.log("此处需要处理初始化数据");
            openNotification("提示","LanguageAddDataActionSuccess",1);
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:true,
                refreshFlag:true
            };
        }
        case LanguageAddDataActionFailure.type:
        {
            openNotification("提示","LanguageAddDataActionFailure",4);
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:false
            };
        }
        case LanguagedeleteDataActionLoading.type:{
            // openNotification("提示","加载中，此时data就必须更新，要获取data的值",2);
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:true
            };
        }
        case LanguagedeleteDataActionSuccess.type:{
            // console.log("此处需要处理初始化数据");
            openNotification("提示","LanguagedeleteDataActionSuccess",1);
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:true,
                refreshFlag:true
            };
        }
        case LanguagedeleteDataActionFailure.type:
        {
            openNotification("提示","LanguagedeleteDataActionFailure",4);
            return {
                columns: state.columns,
                data:state.data,
                jsonData:state.jsonData,
                count:state.count,
                loading:false
            };
        }
        default :
            return state;
    }
};