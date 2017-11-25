import {Table, Input, Popconfirm, Select, Button, Form} from 'antd';


/**
 * 不可变的用变量
 * 可变的用配置
 * type 1 text  默认
 * type 2 select
 * type 3 multiSelect
 * type 4 datetime
 * type 5 date
 * type 6 时间戳（不可更改）
 * type 100 operation 操作组件（原生操作）
 * type 101 自定义操作组件
 */
import {formatDateTime, openNotification} from "./commonFunction";
import * as React from "react";

const FormItem = Form.Item;
class EditableCell extends React.Component {

    state = {
        value: this.props.value,
        editable: this.props.editable || false,
        type: this.props.type,
        initData: this.props.initData,
        initDataKey: this.props.initDataKey,
        initDataValue: this.props.initDataValue
    }

    componentWillReceiveProps(nextProps) {
        // console.log("Cell接受到新属性属性","state",this.state,"nextProps",nextProps,"cacheValue",this.cacheValue,"this.props",this.props);
        if (nextProps.editable !== this.state.editable) {
            this.setState({editable: nextProps.editable});
            if (nextProps.editable) {
                console.log("加载缓存cacheValue！")
                this.cacheValue = this.state.value;
            }
        }
        /**
         * 直接改
         * 如果是cancle，则加载缓存值，如果是save，则加载保存的值
         */
        if (nextProps.status === 'save') {
            console.log("Cell编辑属性save");
            this.props.onChange(this.state.value);
        } else if (nextProps.status === 'cancel') {
            console.log("Cell编辑属性cancel");
            this.setState({value: this.cacheValue});
            // this.props.onChange(this.cacheValue);
        }
        if (nextProps.status && nextProps.status !== this.props.status) {


        }
    }

    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }

    handleChange(value) {
        /*console.log(e);
        const value = e.target.value;
        console.log(value);*/
        console.log("新值！", value);
        this.setState({value});
        this.props.onChange(value, 1);
    }

    render() {
        var {value, editable, type, initData, initDataKey, initDataValue} = this.state;
        // console.log("列渲染",type,this.props);
        if (type === 1) {
            return (
                <div>
                    {
                        editable ?
                            <div>
                                <Input
                                    value={value}
                                    onChange={e => this.handleChange(e.target.value)}
                                />
                            </div>
                            :
                            <div className="editable-row-text">
                                {typeof value !== "undefined" && value !== null ? value.toString() : ' '}
                            </div>
                    }
                </div>
            );
        } else if (type === 2 || type === 3) {
            console.log("select test,initData =", initData, initData.length, initDataKey, initDataValue, "value =", value);
            var mutil = '-';
            //如果是增加行新值，则不触发更新数据，触发会有bug，别人本来就没有值，触发会出错
            if (value === null || typeof value === "undefined" || value === "") {
                value = "";
            }
            if(type === 3){
                mutil = 'multiple';
                if(value === ""){
                    value = [];
                }
                if(value instanceof Array){

                }else {
                    value = value.split(",");
                }
            }else {
                if(value === "") {
                    value = 'please select';
                }//没默认值，怎么办
                value = value.toString();
            }
            console.log(value);
            //title={subData[initDataValue]}
            return (
                        <Select mode = {mutil}
                                showSearch = {true}
                                filterOption = {
                                    (a,b)=>MyFilterOption(a,b)
                                }
                             style={{display:"inline"}}
                                placeholder={"please select".toString()} onChange={e => this.handleChange(e)}
                              disabled={!editable}
                                defaultValue = {value}
                                allowClear={true}>
                            {
                                initData.map((subData) => {
                                    return (
                                        <Select.Option key={subData[initDataKey].toString()}
                                                       value={subData[initDataKey].toString()}>
                                            {subData[initDataValue]}
                                            </Select.Option>
                                    );
                                })
                            }
                        </Select>
            );
        } else if (type === 6) {
            console.log("time test", initData, initDataKey, initDataValue, value);
            var showvalue = null;
            if (typeof value !== "undefined" && value !== null && value !== "") {
                showvalue = formatDateTime(value);
            } else {
                value = formatDateTime(value);
                this.handleChange(value);
                showvalue = value;
            }
            return (
                <div className="editable-row-text">
                    {showvalue}
                </div>)
        } else {
            openNotification("不支持的cell类型" + type);
        }
        ;
    }
}


export function MyFilterOption(value,select) {
    console.log("MyFilterOption",select,value)
    if(typeof select !== "undefined" && select.props.children.indexOf(value) >= 0){
        return true;
    }
}
export default EditableCell;