import {Redirect, Route} from "react-router-dom";
import * as React from "react";
import {url} from 'utils/urlconfig'

function  checkToken() {
    /*if (this.props.path === "/login") {
        console.log("进入登录页面不需要验证");
        console.log(this.props); n
        return;
    }
    else {*/
          let res = fetch(url.check_token_url, {
            credentials: 'include',
            mode: "cors",
            method: 'POST',
            headers: {
                // 'Accept': 'application/json, text/javascript, */*; q=0.01',
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",//"user_name="+n+"&password="+p+"&default_lang="+11
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
            },
            cache: 'reload',
            body: "url_path=" + "urlPath"
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                alert("system error" + response.status);
                this.setStateMy(-1)
                // this.state.auth = -1;
            }
        }).then(data => {
            alert("success123");
            if (data.code == 0) {
                return  true;
            } else {
                return false;
            }
        }).catch(function (error) {
            alert(error);
            console.log('Request failed', error);
            return false;
        }.bind(this));
          return  res;
  /*  }*/
};

function test(){
    return true;
}

const PrivateRoute123 = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkToken() === true?(
            <Component {...props}/>
            )
            :(
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>)
        /* 1 === 2 ? (
             // alert(1)
              <Component {...props}/>
         ) : (
             <Redirect to={{
                 pathname: '/login',
                 state: { from: props.location }
             }}/>
         )*/
    )}/>
)
export default PrivateRoute123;