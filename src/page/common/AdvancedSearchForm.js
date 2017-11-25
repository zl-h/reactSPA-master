import {Form, Row, Col, Input, Button, Icon, Select} from 'antd';
import './common.less'
import * as React from "react";
import {MyfilterOption, MyFilterOption} from "./EditableCell";

const FormItem = Form.Item;


class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
        var requestBody = {};
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ',err, values);
            requestBody = values;
        });

        //此处获取表单数据
        // console.log("把事件及必须参数传递给父组件",this.props.form.validateFields);
        this.props.searchEventClick(requestBody);
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // To generate mock Form.Item
    getFields(columns,jsonData) {
        console.log("columns,jsonData",columns,jsonData);
        const count = this.state.expand ? 100 : 6;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const children = [];
        for (let i = 0; i < columns.length; i++) {
            if(columns[i].componentType === 100 || columns[i].componentType === 101){



            } else if(columns[i].componentType === 2 || columns[i].componentType === 3){
              const {dataKey,valueKey,listKey} =  columns[i];
                //多select，默认全选
                children.push(
                    <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                        <FormItem  {...formItemLayout} label={columns[i].title}>
                            {getFieldDecorator(columns[i].dataIndex)(
                                /*placeholder="placeholder"*/
                                 <Select allowClear ={true} mode="multiple"
                                         placeholder={"please select".toString()}
                                         filterOption = {
                                             (a,b)=>MyFilterOption(a,b)
                                         }
                                         /*initialValue ={1}*/>
                                    {
                                        jsonData[listKey].map((subData) => {
                                            // openNotification(JSON.stringify(subData)+subData[dataKey]+subData[valueKey]);
                                            return   (
                                               <Select.Option key={subData[dataKey].toString()}
                                                               value={subData[dataKey].toString()}>{subData[valueKey]}</Select.Option>
                                            );
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                );
            }else {
                children.push(
                    <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                        <FormItem {...formItemLayout} label={columns[i].title}>
                            {getFieldDecorator(columns[i].dataIndex)(
                                /*placeholder="placeholder"*/
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                )
            }
        }
        console.log("test getFields");
        return children;
    }

    componentDidMount(){
        console.log("搜索框发起异步请求");
        var requestBody = {};
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ',err, values);
            requestBody = values;
        });

        //此处获取表单数据
        // console.log("把事件及必须参数传递给父组件",this.props.form.validateFields);
        this.props.searchEventClick(requestBody);
    }


    render() {
         console.log("渲染高级搜索" ,this);
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={40}>{this.getFields(this.props.columns,this.props.jsonData)}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            Clear
                        </Button>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
                    </Col>
                </Row>
            </Form>
        );
    }
}

AdvancedSearchForm  =  Form.create()(AdvancedSearchForm);

export default AdvancedSearchForm;

