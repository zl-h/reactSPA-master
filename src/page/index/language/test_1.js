/*
import {Table, Input, Popconfirm, Select, Button} from 'antd';
import * as React from "react";
import "./user.less";
import Option from 'antd';

//改造可编辑行
/!**
 * type 1 text  默认
 * type 2 select
 * type 3 multiSelect
 * type 4 datetime
 * typo 5 date
 *!/
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
        if (nextProps.editable !== this.state.editable) {
            this.setState({editable: nextProps.editable});
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({value: this.cacheValue});
                this.props.onChange(this.cacheValue);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }

    handleChange(value) {
        /!*console.log(e);
        const value = e.target.value;
        console.log(value);*!/
        this.setState({value});
    }

    render() {
        const {value, editable, type, initData, initDataKey, initDataValue} = this.state;
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

//稍微改造下即可
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        //列再配置一个属性，是否做查询条件，如果做查询条件，则给查询，配置查询初始默认值，通过数据库配置自动生成数据查询，一切全在配置，这样就不用一个个写了，配置一下就行
        this.columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text, 1),
        }, {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'age', text, 1),
        }, {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text, 2, [{
                id: "1",
                value: 100
            }, {id: "2", value: 200}], "id", "value"),
        }, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const {editable} = this.state.data[index].name;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                  <a onClick={() => this.editDone(index, 'save')}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                                :
                                <span>
                  <a onClick={() => this.edit(index)}>Edit</a>
                </span>
                        }
                    </div>
                );
            },
        }];

        this.state = {
            data: [{
                key: '0',
                name: {
                    editable: false,
                    value: 'Edward King 0',
                },
                age: {
                    editable: false,
                    value: '32',
                },
                address: {
                    value: '1',
                    editable: false
                },
            }, {
                key: '1',
                name: {
                    editable: false,
                    value: 'Edward King 000',
                },
                age: {
                    editable: false,
                    value: '32 000',
                },
                address: {
                    value: '2',
                    editable: false
                },
            }],
        };
    }

    renderColumns(data, index, key, text, type, initData, initDataKey, initDataValue) {
        const {editable, status} = data[index][key];
        if (typeof editable === 'undefined') {
            return text;
        }
        return (
            <div>
                <EditableCell
                    editable={editable}
                    value={text}
                    onChange={value => this.handleChange(key, index, value)}
                    status={status}
                    type={type}
                    initData={initData}
                    initDataKey={initDataKey}
                    initDataValue={initDataValue}
                />
            </div>
        );
    }

    handleChange(key, index, value) {
        const {data} = this.state;
        data[index][key].value = value;
        this.setState({data});
    }

    edit(index) {
        const {data} = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = true;
            }
        });
        this.setState({data});
    }

    editDone(index, type) {
        const {data} = this.state;
        console.log("操作完成" + JSON.stringify(data[index]) + "这里可以选择提交");
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({data}, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }

    //增加，先增加一个空的，让别人去点击编辑，再保存就ok
    handleAdd = () => {
        const {  data } = this.state;
        var key = -1;//传到后台的key如果小于0，即非更新和修改，默认的id是大于0，则根据实际情况做插入操作
        if(data.length > 0){
            if(data[data.length - 1].key < 0) key = data[data.length - 1].key - 1;
        }
        //增加默认为0
        const newData = {
            key: key ,
            name: {
                editable: false,
                value: 'Edward King 0',
            },
            age: {
                editable: false,
                value: '32',
            },
            address: {
                value: '1',
                editable: false
            },
        };
        /!*console.log(data);
        console.log(newData);*!/
        this.setState({
            data: [...data, newData],
        });
    }

    render() {
        const {data} = this.state;
        console.log(data);
            const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });
        const columns = this.columns;
        return(
        <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns}/>
        </div>);
    }
}

const IndexUserPage1 = EditableTable;
export default IndexUserPage1;*/
