import React from 'react';
import {Route} from 'react-router-dom'
import {Layout} from 'antd'
import './content.less'
import Language from "../../page/index/language/Language";

const {Content} = Layout

export default class Contents extends React.Component {
    render() {
        return (
            <Content className="content">
                <Route path="/index/user" component={Language}/>
                <Route path="/index/language" component={Language}/>
            </Content>
        );
    }
}