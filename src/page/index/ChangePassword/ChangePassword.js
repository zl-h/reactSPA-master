import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Spin} from 'antd';
import * as React from "react";
import {connect} from "react-redux";
import {commonExecute, commonFetch} from "../../common/commonFunction";
import {url} from "../../../common/utils/urlconfig";
import {FetchFailure, FetchIng, FetchSuccess} from "./ChangePasswordAction";
import  {Modal }from "antd";
const FormItem = Form.Item;

class ChangePasswordForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        var requestBody = {};
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //values为表单。提交表单即可
                console.log('Received values of form: ', values);
                requestBody = values;
            }
            this.props.changePassword(requestBody);
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        return (
            <Spin spinning={loading}>
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    <h1>修改密码</h1>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                >
                    {getFieldDecorator('userName', {
                        rules: [{
                            required: true, message: 'Please input your userName!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input  />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="原密码"
                    hasFeedback
                >
                    {getFieldDecorator('oldPassword', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="新密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="确认新密码"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认修改</Button>
                </FormItem>
            </Form>
            </Spin>
        );
    }

    componentDidUpdate(){
        //组件渲染后只会调用一次componentDidMount,其余都调用componentDidUpdate
        console.log("跳转",this.props);
        const {logoutFlag} = this.props;
        if(logoutFlag === true){
            Modal.info({
                title: '密码修改后提示',
                content: (
                    <div>
                        <p>由于您修改密码，需要重新登陆</p>
                    </div>
                ),
                onOk() {
                    window.location.href = "/login";
                    // ChangePasswordForm.props.history.push("/login");
                    },
            });

        }
    }
}


//由状态转化为属性
function mapStateToProps(state){
    //原来梗在这里，这里的state应该是根store的state,下面有很多reducer，问题需要一步一步定位，这样才能更清晰
    //在这里还可以取到其他组件现在的状态
    console.log("state",state);
    // console.log("渲染之前的状态=》属性");
    return {
        loading : state.CommonReduce.ChangePasswordReducer.loading,
        logoutFlag:state.CommonReduce.ChangePasswordReducer.logoutFlag
    };
};

//定义组件操作和具体动作的关系,执行同步操作传入action即可，执行异步操作需要在此异步
//异步之后再操作action
function mapDispatchToProps(dispatch){
    return{
        //index代表哪一行，action对应动作
        changePassword: (body) => dispatch(commonFetch(url.index_change_password_url,body,FetchIng,FetchSuccess,FetchFailure))
    }
};

// export  const New = EditableTable;

//连接组件
ChangePasswordForm = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);


ChangePasswordForm = Form.create()(ChangePasswordForm);
export default ChangePasswordForm;