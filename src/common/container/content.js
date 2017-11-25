import React from 'react';
import {Route} from 'react-router-dom'
import {Layout} from 'antd'
import './content.less'
import Language from "../../page/index/language/Language";
import Group from "../../page/index/Group/Group";
import User from "../../page/index/User/User";
import Menu from "../../page/index/Menu/Menu";
import ChangePasswordForm from "../../page/index/ChangePassword/ChangePassword";

const {Content} = Layout

export default class Contents extends React.Component {
    render() {
        return (
            <Content className="content">
                <Route path="/index/group" component={Group}/>
                <Route path="/index/language" component={Language}/>
                <Route path="/index/user" component={User}/>
                <Route path="/index/menu" component={Menu}/>
                <Route path="/index/changePassword"  component={ChangePasswordForm}/>
            </Content>
        );
    }
}