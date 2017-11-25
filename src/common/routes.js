import React from 'react'
import {Router, Redirect, Route, Switch, HashRouter} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import LoginIn from "./pages/login/login1";
import AuthRoute from "./auth/AuthRoute";
import MyContainer from "./container/index";
import IndexUserPage from "../page/common/EditableTable";
import WrappedAdvancedSearchForm from "../page/common/AdvancedSearchForm";
import MyUserComponment from "../page/index/language/UserComponment";
import IndexUserPage1 from "../page/index/language/test_1";
import Language from "../page/index/language/Language";
import ChangePasswordForm from "../page/index/ChangePassword/ChangePassword";

// const customHistory = createBrowserHistory()hashHistory={customHistory}

const routes = (
  <HashRouter>
    <div>
        <Switch>
            <AuthRoute path="/index"  component={MyContainer}/>
            <Route path="/" component={LoginIn} exact />
            <Route path="/test"  component={IndexUserPage}/>
            <Route path="/test1"  component={WrappedAdvancedSearchForm}/>
            <Route path="/test3"  component={Language}/>

            <Route path="/index/changePassword"  component={ChangePasswordForm}/>
            {/*//设置authFlag为0即不拦截，不做处理*/}
            <Route path="/login" authFlag = "0" component={LoginIn}/>

        </Switch>
    </div>
  </HashRouter>
);

export default routes;