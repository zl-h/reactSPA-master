/*
import React from 'react'
import {Redirect, Route} from "react-router-dom";
import createHistory from 'history/createHashHistory';
import {url} from 'utils/urlconfig'
import { BrowserRouter } from 'react-router-dom';
const history = createHistory();
function auth(url1){
    fetch(url.check_token_url, {
        credentials: 'include',
        mode: "cors",
        method: 'POST',
        headers: {
            // 'Accept': 'application/json, text/javascript, *!/!*; q=0.01',
            "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",//"user_name="+n+"&password="+p+"&default_lang="+11
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE'
        },
        cache: 'reload',
        body: ""
        //JSON.stringify({"user_name":n,"password":p,"default_lang":1})
    }). then(response => {
        if(response.status == 200) {
            return response.json();
        }else {
            alert("system error" + response.status);
            return;
        }
    }).then(data => {
        if(data.code != 0){
            alert(data.message);
            return ;
        }
        history.push("../index");
        // data就是我们请求的repos
        console.log(data)
    }) .catch(function (error) {
        alert(error);
        console.log('Request failed', error);
    });
    return true;
}
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        alert(props);
        console.log(props);
        return <Component {...props}/>;
        return (
            1 === 1?
                auth(props.match.path) ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/permission-403',
                        state: {from: props.location}
                    }}/>
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
                )
        )
    }}/>
);

export default PrivateRoute;*/
