import {Table, Input, Popconfirm, Select, Button} from 'antd';

/**
 * 不可变的用变量
 * 可变的用配置
 * type 1 text  默认
 * type 2 select
 * type 3 multiSelect
 * type 4 datetime
 * typo 5 date
 * type 100 operation 操作组件（原生操作）
 * type 101 自定义操作组件
 */
import * as React from "react";

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
        // console.log("新值！",value);
        this.setState({value});
        this.props.onChange(value,1);
    }

    render() {

        const {value, editable, type, initData, initDataKey, initDataValue} = this.state;
        // console.log("列渲染",value,this.props);
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
                                {value.toString() || ' '}
                            </div>
                    }
                </div>
            );
        } else if (type === 2) {
            console.log(JSON.stringify(initData));
            return (
                <div>
                    <Select onChange={e => this.handleChange(e)} disabled={!editable} defaultValue={value}
                            style={{width: 120}}>
                        {
                            initData.map((subData) => {
                                return (
                                    <Select.Option key={subData[initDataKey]}
                                                   value={subData[initDataKey]}>{subData[initDataValue]}</Select.Option>
                                );
                            })
                        }
                    </Select>
                </div>)
        }
        ;
    }
}

export default EditableCell;