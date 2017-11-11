import {Table, Input, Popconfirm, Select, Button} from 'antd';
import * as React from "react";
import "./common.less";
import {
    addRowForIndexUser, dealCellAction, dealCellActionDelete, editRowForIndexUser, SelectAllAction,
} from "../index/language/LanguagecommonAction";
import AdvancedSearchForm from "./AdvancedSearchForm";
import EditableCell from "./EditableCell";
import {combineJson} from "./commonFunction";

//改造可编辑行
//仅初始化时操作
export function getEditableByKeyAndColumns(key,columns){
    for(var i = 0;i < columns.length;i ++){
        // console.log(columns[i].dataIndex,columns)
        if(columns[i].dataIndex === key){
            return columns[i].editable === true?true:false;
        }
    }
    return "undefined";
}

const tablePagination =
{
    defaultCurrent: 1,
    showSizeChanger:true,
    pageSizeOptions:['10','50','100','500','2000'],
    showTotal:(total, range) =>{
        return `${range[0]}-${range[1]} of ${total} items`}
};

//稍微改造下即可
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        //列再配置一个属性，是否做查询条件，如果做查询条件，则给查询，配置查询初始默认值，通过数据库配置自动生成数据查询，一切全在配置，这样就不用一个个写了，配置一下就行
        const page = tablePagination.pageSizeOptions;
        // console.log(page)
        this.config = {
            current : tablePagination.defaultCurrent,
            pageSize : page[0],
            requestPageParams:{
                current:tablePagination.defaultCurrent,
                pageSize : page[0]
            },
            requestBody:{}
        };

        this.action = {
            addAction:this.props.addAction,
            editAction:this.props.editAction,
            getAction:this.props.getAction,
            dealCellAction:dealCellAction,
            deleteAction:this.props.deleteAction,
            dealCellActionDelete:dealCellActionDelete
        }
    }

    renderColumns(data, index, key, text, type, initData, initDataKey, initDataValue) {
        // console.log("渲染列" ,"data",data,index,key,data[index][key],"text",text,initData);
        if(data[index][key] === null || typeof data[index][key]  === 'undefined')return data[index][key];
        var {editable, status} = data[index][key];
        // console.log("是否可编辑" + editable)
        if (typeof editable === 'undefined') {
            return text;
        }
        return (
            <div>
                <EditableCell
                    editable={editable}
                    value={text}
                    onChange={(value,changeType) => this.handleChange(key, index, value,changeType)}
                    status={status}
                    type={type}
                    initData={initData}
                    initDataKey={initDataKey}
                    initDataValue={initDataValue}
                />
            </div>
        );
    }

    handleChange(key, index, value,changeType) {
        //如果改变了，立马刷新datasource，设置缓存值，cacheValue
        // console.log("cell变化触发table执行相应操作","changeType",changeType,"value",value);
        const {data} = this.props;
        if(changeType === 0 || changeType === null){
            //加载真实值
            data[index][key].value = value;
        }else if(changeType === 1){
            //加载缓存值
            data[index][key].cacheValue = value;
        }
        // this.props.data[index][key].value = value;
        // this.setState({data});
    }

    searchEventClick(formData) {
        //如果改变了，立马刷新datasource，设置缓存值，cacheValue
        // console.log("高级搜索查询",formData,"this",this);

        //保存表单参数
        this.config.requestBody = formData;

        this.action.getAction.requestBody = combineJson(this.config.requestBody,this.config.requestPageParams);

        this.props.customWayActionClick(null,null,this.action.getAction);
    }

    edit(index) {
        // console.log(this)
        const {data} = this.props;
        this.props.customWayActionClick(data,index,editRowForIndexUser);
        //设置缓存值等于真实值
        Object.keys(data[index]).forEach((key) => {
            if(typeof data[index][key].value !== "undefined")
            data[index][key].cacheValue = data[index][key].value;
        });
        // console.log("设置缓存值等于真实值",data[index]);
        //编辑，需要传参调用
        // this.setState({data});
    }

    delete(index) {
        const {data} = this.props;

        var id = data[index].key;
        if(id > 0){
            console.log("执行删除",data,index);
            this.action.deleteAction.requestBody = {id:id};
            this.props.customWayActionClick(data,index,this.action.deleteAction);
        }else {
            console.log("不执行删除，如果时新增还没入库得，则从界面上删除",data,index);
            this.props.customWayActionClick(data,index,this.action.dealCellActionDelete);
        }


        //设置缓存值等于真实值
        //编辑，需要传参调用
        // this.setState({data});

    }

    editDone(index, type) {
        //可以设定一些自定义参数，约定好即可
        const {data}  = this.props;

        var json = {};
        json.type = type;
        json.index = index;
        this.action.editAction.index = index;
        this.action.editAction.operatetype = type;
         console.log("点击操作按钮",type,index,"this",this);

        this.action.dealCellAction.operatetype = type;
        this.action.dealCellAction.index = index;
        //首先把cell状态改变
        this.props.customWayActionClick(data,index,this.action.dealCellAction);

        if(type === "save"){
            //将列的最新值放在缓存值里
            Object.keys(data[index]).forEach((key) => {
                if(typeof data[index][key].value !== "undefined")
                    data[index][key].value = data[index][key].cacheValue;
            });
            //判断是修改还是增加，不要耦合到一起 要分开
            if(data[index].key > 0){
                //修改
                this.props.customWayActionClick(data,json,this.action.editAction);
            }else {
                //增加,尽量把参数放在action里
                this.action.addAction.index = index;
                this.props.customWayActionClick(data,index,this.action.addAction);
            }
        }

        //列编辑完成之后，触发数据更新
        //数据更新之后没有触发列的变化

    }

    //增加，先增加一个空的，让别人去点击编辑，再保存就ok
    handleAdd = () => {
        console.log("调用自定义的action--add",this.props);
        var {  data } = this.props;
        addRowForIndexUser.current = this.config.current;
       this.props.customWayActionClick(data,0,addRowForIndexUser);
    }

    tableOnChange = (pagination, filters, sorter) => {
        // preventDefault();
        console.log('params', pagination, filters, sorter);

        this.config.current = pagination.current;
        this.config.pageSize = pagination.pageSize;

        //保存分页参数
        this.config.requestPageParams = combineJson(pagination,sorter);

        this.action.getAction.requestBody = combineJson(this.config.requestBody,this.config.requestPageParams);

        this.props.customWayActionClick(null,null,this.action.getAction);

    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        SelectAllAction.selectedRowKeys = selectedRowKeys;
        this.props.customWayActionClick(null,null,SelectAllAction);
    }

    render() {
        const {data,columns,jsonData,customWayActionClick,count,loading,addButtonFlag,selectAllFlag,selectedRowKeys,MyButton} = this.props;
        tablePagination.total = count;
        // console.log(this.props,columns);
        console.log("开始渲染",this);
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                // console.log(item[key])
                // console.log(item[key].value)
                obj[key] = key === 'key' ? item[key] :item[key] === null?item[key] : item[key].value;
            });
            // console.log(obj);
            return obj;
        });

        //jsonData里存放的是key和对应的列表,一个列如果是select的话，会对应一个下拉列表,多个则对应多个下拉列表
        //配合redux的处理方式，把数据放在props里面
        //传的是column和data,还有列对应的数组，以及对应的json数据，可能一个列对应一个json数据组
        //列关闭宽度，20171031 huangzhilI
        var MyColumns = columns.map((item) => {
            const col = {
                title: item.title,
                dataIndex: item.dataIndex,
                // width: item.width
            };
            if(item.componentType < 100){
                col.sorter = (a, b) =>{
                    // console.log("a",a,"b",b,"item",item);
                    a[item.dataIndex] - b[item.dataIndex]
                } ;
            }
            if (item.componentType === 1) {
                col.render = (text, record, index) => this.renderColumns(this.props.data, index, item.title, text, 1,record);
            }else if(item.componentType === 2){
                col.render = (text, record, index) => this.renderColumns(this.props.data, index, item.title, text, 1,jsonData[item.listKey], item.dataKey, item.valueKey);
            }else if(item.componentType === 100){
                col.render = (text, record, index) => {
                    // console.log(data[index]);
                    const {editable} = data[index].id;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                  <a onClick={() => this.editDone(index, 'save')}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span> : <span>
                  <a onClick={() => this.edit(index)}>Edit</a>
                </span>
                            }
                            {
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(index)}>
                                    <a>delete</a>
                                </Popconfirm>
                            }
                        </div>
                    );
                }
            }else if(item.componentType === 101){
                col.render = (text, record, index) =>
                {
                    const {editable} = this.props.data[index].name;
                    return (
                        <div className="editable-row-operations">
                            {
                  <a onClick={() => this.customWayActionClick(this.props.data,index,{type:item.action})}>{item.title}</a>
                            }
                        </div>
                    );
                }
            }else {
                console.log("不支持的组件,默认为text组件");
                col.render = (text, record, index) => this.renderColumns(this.props.data, index, item.title, text, 1)
            }
            return col;
        });
        console.log("渲染结束",dataSource);
        /*const {data} = this.state;
        console.log(data);
        const columns = this.columns;*/
        return(
        <div>
            {/*添加搜索框*/}
            <AdvancedSearchForm columns = {columns} searchEventClick={formData => this.searchEventClick(formData)}/>
{/*    onChange={(value,changeType) => this.handleChange(key, index, value,changeType)}*/}
            {addButtonFlag === true?<Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>:""}
            {MyButton.map((item) => {
                return <Button key = {item.name} className="editable-add-btn" onClick={() => this.customWayActionClick(null,null,item.action)}>{item.name}</Button>
            })
            }
        <Table
            rowSelection = {selectAllFlag === true?{
                hideDefaultSelections : false,
                selectedRowKeys : selectedRowKeys,
                onChange:this.onSelectChange
            }:{
                hideDefaultSelections : true,
            }}
            loading = {loading}
            pagination = {tablePagination}
            bordered dataSource={dataSource}
            columns={MyColumns}
            onChange={this.tableOnChange}/>
            {/*rowSelection={rowSelection}*/}
        </div>);
    }

    customWayActionClick = (data,index,action) => {
        console.log("调用自定义的action",this.props,action);
        action.props = this.props;
        this.props.customWayActionClick(data,index,action);
    }

    /**
     * 真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。

     在服务端中，该方法不会被调用。
     */
    componentDidMount(){

    }

    /**
     * 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
     */
    componentDidUpdate(){
        console.log("重新请求服务器数据进行渲染",this.props)
        // console.log("父组件不发起异步请求");
        /*this.props.customWayActionClick(null,null,this.action.getAction);*/
        if(this.props.refreshFlag === true){
            //得刷新一次
            console.log("重新请求服务器数据进行渲染")
            this.props.customWayActionClick(null,null,this.action.getAction);
        }
    }
}

export default EditableTable;