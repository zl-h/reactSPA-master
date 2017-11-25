import * as React from "react";
import {Form} from "antd";
import Button from "antd/es/button/button";
import EditableTable from "../../common/EditableTable";
import {
    LanguageAddDataAction, LanguagedeleteDataAction, LanguageEditDataAction,
    LanguageGetDataAction, LanguageMyButtonAction
} from "./UserAction";
import {
    addRowForIndexUser, dealCellAction, dealCellActionDelete, editRowForIndexUser,
    SelectAllAction
} from "./UsercommonAction";
import {executeLanguage} from "./UserFunction";
import {connect} from "react-redux";

class User extends React.Component {

    componentWillMount(){
     /*   console.log("UserComponment初始化开始");

        this.data = {

        };
        console.log("UserComponment初始化结束");*/
    }

    render() {
        console.log("Language渲染",this);
        //是否需要增加按钮
        const addButtonFlag = true;
        const selectAllFlag = true;
        const MyButton = [{
            name : "批量删除",
            action:LanguageMyButtonAction
        }];

        return (<div>
            <EditableTable
                MyButton = {MyButton}
                selectAllFlag = {selectAllFlag}
                selectedRowKeys = {this.props.selectedRowKeys}
                addButtonFlag = {addButtonFlag}
                data = {this.props.data}
                refreshFlag = {this.props.refreshFlag}
                columns = {this.props.columns}
                jsonData = {this.props.jsonData}
                count = {this.props.count}
                loading = {this.props.loading}
                customWayActionClick={(data,index,action) => this.props.customWayActionClick(data,index,action)}
                deleteAction = {LanguagedeleteDataAction}
                addAction={LanguageAddDataAction}
                editAction = {LanguageEditDataAction}
                getAction = {LanguageGetDataAction}

                addRowForIndexUser = {addRowForIndexUser}
                dealCellAction = {dealCellAction}
                dealCellActionDelete = {dealCellActionDelete}
                editRowForIndexUser = {editRowForIndexUser}
                SelectAllAction = {SelectAllAction}
            />
        </div>);
    }
}

//应用redux

//由状态转化为属性
function mapStateToProps(state){
    //原来梗在这里，这里的state应该是根store的state,下面有很多reducer，问题需要一步一步定位，这样才能更清晰
    //在这里还可以取到其他组件现在的状态
    console.log("state",state);
    // console.log("渲染之前的状态=》属性");
    return {
        data: state.CommonReduce.UserReducer.data,
        columns: state.CommonReduce.UserReducer.columns,
        jsonData: state.CommonReduce.UserReducer.jsonData,
        count : state.CommonReduce.UserReducer.count,
        loading : state.CommonReduce.UserReducer.loading,
        refreshFlag:state.CommonReduce.UserReducer.refreshFlag,
        selectedRowKeys:state.CommonReduce.UserReducer.selectedRowKeys
    };
};

//定义组件操作和具体动作的关系,执行同步操作传入action即可，执行异步操作需要在此异步
//异步之后再操作action
function mapDispatchToProps(dispatch){
    return{
        //index代表哪一行，action对应动作
        customWayActionClick: (data,index,action) => dispatch(executeLanguage(data,index, action))
    }
};

// export  const New = EditableTable;

//连接组件
User = connect(mapStateToProps, mapDispatchToProps)(User);

User =  Form.create()(User);
export default User;