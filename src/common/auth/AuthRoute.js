/*
* 登录验证
* */
import React from "react";
import {Redirect, Route} from "react-router-dom";
import {url} from '../utils/urlconfig'
import {connect} from "react-redux";
import {commonFetch} from "../../page/common/commonFunction";
import {AuthActionFailure, AuthActionLoading, AuthActionSuccess} from "./AuthAction";
import Spin from "antd/es/spin/index";

const isEmptyChildren = children => React.Children.count(children) === 0;
class AuthRoute extends Route {
    /*constructor(props,route) {
        super(props,route);
        /!*this.state = {
            auth: 0
        }*!/
       /!* this.state = {
            auth: 0
        }
        this.setStateMy = this.setStateMy.bind(this)*!/
    }*/
/*    getInitialState(){
        return {
                auth: 0
        }
    }*/
    componentWillMount() {
        //重写父类方法
        super.componentWillMount();
        //权限校验
        this.props.auth();
       /* const { match } = this.state;
        this.setState({
            auth : 0
        });
        console.log(match);*/
        //路径不匹配，不验证token
        /*if(match){
            this.checkToken(this.props.path);
        }else {
            console.log("路径不匹配，直接跳转登录，不验证权限")
        }*/
        // const {match} = this.state;
    }
    setStateMy(auth_v){
        this.setState({
            auth : auth_v
        });
    }

    render() {
        console.log("渲染",this.state,this.props);
        const { match } = this.state;
        const { children, component, render,authFlag } = this.props;
        const { history, route, staticContext } = this.context.router;
        const location = this.props.location || route.location;
        const props = { match, location, history, staticContext };
        //由于fetch是异步的，即在渲染时先校验权限，再渲染
        //完全覆盖父类方法
        if (component) {
            console.log("组件渲染");
            if (!match){
                return <Redirect to="/login" />;
            }
            //如果是登录页面
            if(authFlag === 0){
                //去验证
                console.log("校验",this.state);
                return <Spin spinning = {true}/>;
            }else if(authFlag === -1){
                //跳转至登录
                // alert("登录超时");
                console.log("权限检验不通过" , this.props);
                return <Redirect to="/login" />;
            }else if(authFlag === 1){
                //验证通过
                console.log("权限检验通过" , this.props);
                // return React.createElement(component, props);
            }else {
                //去验证
                console.log("不存在此情况");
                console.log(this.state);
                return <Spin spinning = {true}/>;
            }
            return React.createElement(component, props);
        }
        console.log("skip component");
        if (render) return match ? render(props) : null;
        if (typeof children === "function") return children(props);
        if (children && !isEmptyChildren(children))
            return React.Children.only(children);
        return null;
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps, nextContext) {
        //重写父类方法
        super.componentWillReceiveProps(nextProps, nextContext);
    }

     checkToken(urlPath){
         if(this.props.path === "/login"){
             console.log("进入登录页面不需要验证");
             console.log(this.props);
             return ;
         }
        else {
             fetch(url.check_token_url, {
                 credentials: 'include',
                 mode: "cors",
                 method: 'POST',
                 headers: {
                     // 'Accept': 'application/json, text/javascript, */*; q=0.01',
                     "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",//"user_name="+n+"&password="+p+"&default_lang="+11
                     'Access-Control-Allow-Origin':'*',
                     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
                 },
                 cache: 'reload',
                 body: "url_path="+urlPath
             }). then(response => {
                 if(response.status == 200) {
                     return response.json();
                 }else {
                     alert("system error" + response.status);
                     this.setStateMy(-1)
                     // this.state.auth = -1;
                 }
             }).then(data => {
                 /* console.log("改变状态");
                  this.setStateMy()
                  console.log(this.state);
                  this.setState({
                      state:1
                  }).catch(function (error) {
                      console.log('Request failed', error);
                  });
                  console.log("改变状态end");
                  console.log(data);*/
                     /*  this.setStateMy();*/
                     if(data.code == 0){
                     // alert("验证通过");
                     console.log("验证通过");
                     this.setStateMy(1)
                 }else {
                     console.log("验证不通过");
                     this.setStateMy(-1)
                 }
             }) .catch(function (error) {
                 console.log('Request failed', error);
                 alert(error);
                 this.setStateMy(-1)
             }.bind(this));
         }
    }
}


//由状态转化为属性
function mapStateToProps(state){
    //原来梗在这里，这里的state应该是根store的state,下面有很多reducer，问题需要一步一步定位，这样才能更清晰
    //在这里还可以取到其他组件现在的状态
    console.log("mapStateToProps state" ,state);
    return {
/*        children: state.authReducer.children,
        component: state.authReducer.component,
        render:state.authReducer.render,*/
        authFlag:state.authReducer.authFlag
    };
};

//定义组件操作和具体动作的关系,执行同步操作传入action即可，执行异步操作需要在此异步
//异步之后再操作action
function mapDispatchToProps(dispatch){
    return{
        //初始化
        auth: () => dispatch(commonFetch(url.check_token_url, null,AuthActionLoading,AuthActionSuccess,AuthActionFailure))
    }
};

AuthRoute = connect(mapStateToProps, mapDispatchToProps)(AuthRoute);

export default AuthRoute;