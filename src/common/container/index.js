import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Icon, Switch, Layout } from 'antd'
import { allMenu } from '../utils/menu'
import Top from './header'
import Contents from './content'
import Footer from './bottom'
import './index.less';
import { connect } from 'react-redux';
import {url} from "../utils/urlconfig";
import {commonFetch} from "../../page/common/commonFunction";
import {fetchActionFailure, fetchActionLoading, fetchActionSuccess} from "./LanguagecommonAction";

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

class Container extends React.Component {
    state = {
        theme: 'dark',
        current: 'index',
        collapsed: false,
        mode: 'inline',  // 水平垂直展现
    }
    componentWillMount() {
        // console.log(this.props.menus);
        // console.log(this.state);
        this.props.onButtonClick(this.props.menus);
    }
    changeTheme = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: this.state.collapsed ? 'inline' : 'vertical',
        });
    }
    clear = () => {
        this.setState({
            current: 'index',
        });
    }
    handleClick = (e, special) => {
        this.setState({
            current: e.key || special,
        });
    }
    render() {
        console.log("渲染menus = ", this.props);
        var {menus,onButtonClick} = this.props;
        if(menus.length === 0){
            //测试阶段如果没有数据取默认数据
            menus = allMenu;
           /* this.props = {
                menus: allMenu,
                onButtonClick:onButtonClick
            };*/
        }

        return (
            <Layout className="containAll">
              <Sider
                  collapsible
                  collapsed={this.state.collapsed}
                  onCollapse={this.onCollapse}
                  /*className="leftMenu"*/
                  width = {200}>
                  {this.state.theme === 'light' ? <a href="https://github.com/MuYunyun/react-antd-demo" target='_blank' rel='noopener noreferrer'><Icon type="github" className="github" /></a> :
                      <a href="https://github.com/MuYunyun/react-antd-demo" target='_blank' rel='noopener noreferrer'><Icon type="github" className="github white" /></a> }
                  { this.state.theme === 'light' ? <span className="author">Huangzhili</span> : <span className="author white">Huangzhili</span> }
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    defaultOpenKeys={['']}
                    selectedKeys={[this.state.current]}
                    className="menu"
                    mode={this.state.mode}
                    inlineCollapsed="true"
                >
                    {
                        menus.map((subMenu1) => {
                            if (subMenu1.children && subMenu1.children.length) {
                                return (
                                    <SubMenu key = {subMenu1.menu.id} title={<span>{subMenu1.menu.menuName}</span>}>
                                        {subMenu1.children.map(subMenu2 => {
                                            if(subMenu2.children && subMenu2.children.length){
                                              return (
                                                    <SubMenu key = {subMenu2.menu.id} title={<span>{subMenu2.menu.menuName}</span>}>
                                                  {
                                                      subMenu2.children.map(subMenu3 => {
                                                        return (
                                                            <Menu.Item key = {subMenu3.menu.id}><Link to={`/index/${subMenu3.menu.menuUrl}`}>{subMenu3.menu.menuName}</Link></Menu.Item>
                                                        )
                                                    })
                                                  }
                                              </SubMenu>
                                                )
                                            }
                                            return <Menu.Item key = {subMenu2.menu.id}><Link to={`/index/${subMenu2.menu.menuUrl}`}>{subMenu2.menu.menuName}</Link></Menu.Item>
                                        }
                                        )
                                        }
                                    </SubMenu>
                                )
                            }
                            return (
                                <Menu.Item key = {subMenu1.menu.id}>
                                  <Link to={`/index/${subMenu1.menu.menuUrl}`}>
                                      <span className="nav-text">{subMenu1.menu.menuName}</span>
                                  </Link>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
                <div className="switch">
                  <Switch
                      checked={this.state.theme === 'dark'}
                      onChange={this.changeTheme}
                      checkedChildren="Dark"
                      unCheckedChildren="Light"
                  />
                </div>
              </Sider>
              <Layout>
                <Top toggle={this.toggle} collapsed={this.state.collapsed} clear={this.clear} />
                <Contents />
                <Footer />
              </Layout>
            </Layout>
        );
    }
};

//由状态转化为属性
function mapStateToProps(state){
    //原来梗在这里，这里的state应该是根store的state,下面有很多reducer，问题需要一步一步定位，这样才能更清晰
    //在这里还可以取到其他组件现在的状态
    console.log("mapStateToProps state" ,state);
    return {
        menus: state.operateReducer.menus
    };
};

//定义组件操作和具体动作的关系,执行同步操作传入action即可，执行异步操作需要在此异步
//异步之后再操作action
function mapDispatchToProps(dispatch){
    return{
        onButtonClick: (myBody) => dispatch(commonFetch(url.index_menu_url, myBody,fetchActionLoading,fetchActionSuccess,fetchActionFailure))
    }
};

//连接组件
const MyContainer = connect(mapStateToProps, mapDispatchToProps)(Container);
export default MyContainer;