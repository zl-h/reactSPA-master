import React from 'react'
import {Form, Icon, Input, Button, Checkbox, Row, Layout, Spin,Select} from 'antd'
import {url} from '../../utils/urlconfig'
import createHistory from 'history/createHashHistory';
import {commonFetch} from "../../../page/common/commonFunction";
import {connect} from "react-redux";
import {
    initActionFailure, initActionLoading, initActionSuccess, loginActionFailure, loginActionLoading,
    loginActionSuccess
} from "./LoginAction";

require("./login1/css/style.css");
const FormItem = Form.Item;
const history = createHistory();

class LoginIn extends React.Component {

    handleSubmit = (e) => {
        // alert(JSON.stringify(e))
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let n = this.props.form.getFieldsValue().username;
                let p = this.props.form.getFieldsValue().password;
                let languageId = this.props.form.getFieldsValue().languageId;
                //此处校验用户名和密码
                // alert(n + p);
                var formData = new FormData();
                formData.append("user_name",n);
                formData.append("password",p);
                formData.append("default_lang",11);
                var json = {};
                json.user_name = n;
                json.password = p;
                json.default_lang = languageId;
                this.props.login(json);
            }
        });
    }

    handleChange = (e) => {
        // alert(JSON.stringify(e))
        //切换语言，重新下载语言包
        var json = {};
        json.languageId = e;
        this.props.changeLanguage(json);
    }

    render() {
        console.log("this",this);
        const {loading,languageList,translate,defaultLanguage,loginFlag,languageDictList} = this.props;
        const { getFieldDecorator } = this.props.form;
        if(loginFlag === true){
            this.props.history.push("../index");
        }
        return (
            <div className="login-div">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            <h1 style={{color:"black"}}></h1>
                <Form onSubmit={this.handleSubmit} className="login-form" id = "loginFormId">
                <div className="close"> </div>
                <div className="head-info">
                    <label className="lbl-1"> </label>
                    <label className="lbl-2"> </label>
                    <label className="lbl-3"> </label>
                </div>
                <div className="clear"></div>
                <div className="avtar">
                    <img src={require("./login1/images/avtar.png")} />
                </div>
                    <br/>
                    <Spin spinning={loading}>
                    <FormItem>
                        <div  style={{align:"center"}}><h1 style={{color:"white"}}>{getDictByCode("000001",languageDictList)}</h1></div>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input  name = "user_name" prefix={<Icon type="user"  style={{ fontSize: 13 }} />} placeholder={getDictByCode("000002",languageDictList)} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input  name = "password" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder={getDictByCode("000003",languageDictList)} />
                        )}
                    </FormItem>
                        <FormItem>
                            {getFieldDecorator('languageId', {
                                rules: [{ required: false, message: 'Please select your languageId!' }],
                                initialValue:defaultLanguage
                            })(
                                //initialValue={defaultLanguage} {/*defaultValue={defaultLanguage}*/}
                                <Select  onChange={e => this.handleChange(e)} className = "myselec" placeholder={getDictByCode("000004",languageDictList)}
                                        /*style={{width : 90 + "%"}}*/>
                                    {
                                        languageList.map((subData) => {
                                            return (
                                                <Select.Option key={subData.id}
                                                               value={"" + subData.id + ""}>{subData.userLanguage}</Select.Option>
                                            );
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>

                    {/*<input type="text" className="text" value=""  placeholder="Username" />*/}
                        {/*<div className="key">*/}
                            {/*<input type="password" value=""  placeholder="Password" />*/}
                        {/*</div>*/}
                <div className="signin">
                    <input type="submit"  value={getDictByCode("000005",languageDictList)} />
                </div>
                    </Spin>
            {/*</div>*/}
                </Form>
            </div>)
    }

    componentDidMount(){
        //初始化
        this.props.init();
    }

};


function getDictByCode(code,list) {
    console.log(list);
    for(var  i = 0;i < list.length; i ++){
        if(list[i].dictCode === code){
            return list[i].dictValue;
        }
    }
    return code;
}

//由状态转化为属性
function mapStateToProps(state){
    //原来梗在这里，这里的state应该是根store的state,下面有很多reducer，问题需要一步一步定位，这样才能更清晰
    //在这里还可以取到其他组件现在的状态
    console.log("mapStateToProps state" ,state);
    return {
        loginFlag: state.loginReducer.loginFlag,
        //是否加载中
        loading: state.loginReducer.loading,
        //语言选择列表
        languageList:state.loginReducer.languageList,
        defaultLanguage:state.loginReducer.defaultLanguage,
        //对应语言的翻译
        languageDictList:state.loginReducer.languageDictList
    };
};

//定义组件操作和具体动作的关系,执行同步操作传入action即可，执行异步操作需要在此异步
//异步之后再操作action
function mapDispatchToProps(dispatch){
    return{
        //初始化
        init: () => dispatch(commonFetch(url.login_init, null,initActionLoading,initActionSuccess,initActionFailure)),
        login: (request) => dispatch(commonFetch(url.login_url, request,loginActionLoading,loginActionSuccess,loginActionFailure)),
        changeLanguage: (request) => dispatch(commonFetch(url.login_init, request,initActionLoading,initActionSuccess,initActionFailure))
    }
};


//由状态转化为属性
function mapPropsToFields123(state){
    //原来梗在这里，这里的state应该是根store的state,下面有很多reducer，问题需要一步一步定位，这样才能更清晰
    //在这里还可以取到其他组件现在的状态
    console.log("mapStateToProps state" ,this,state);
    return {
        //是否加载中
        loading: state.loginReducer.loading,
        //语言选择列表
        languageList:state.loginReducer.languageList,
        defaultLanguage:state.loginReducer.defaultLanguage,
        //对应语言的翻译
        languageDictList:state.loginReducer.languageDictList
    };
};

//连接组件mapPropsToFields : mapPropsToFields123
LoginIn = Form.create({})(LoginIn);

LoginIn = connect(mapStateToProps, mapDispatchToProps)(LoginIn);

export default LoginIn;