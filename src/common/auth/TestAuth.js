import React from 'react';
import Login from '../pages/login'
import {Route} from 'react-router-dom'

const isEmptyChildren = (children) =>
    React.Children.count(children) === 0

class TestAuth extends Route {
    render() {
        //完全覆盖父类方法
        const { match } = this.state
        const { children, component, render } = this.props
        const { history, route, staticContext } = this.context.router
        const location = this.props.location || route.location
        const props = { match, location, history, staticContext }
        if (component){
            if(!match) return null;
            return  this.state.isAuthed ? React.createElement(component, props) : React.createElement(Login, props)
        }
        if (render)
            return match ? render(props) : null

        if (typeof children === 'function')
            return children(props)

        if (children && !isEmptyChildren(children))
            return React.Children.only(children)
        return null
    }
    componentWillMount(){
        //重写父类方法
        super.componentWillMount();
        const { match } = this.state;
        alert(120);
        console.log('test()')
        if(match){
            console.log('componentWillMount()')
            this.auth();
        }
    }
    componentWillReceiveProps(nextProps,nextContext){
        //重写父类方法
        super.componentWillReceiveProps(nextProps,nextContext);
        const { match } = this.props;
        if(match ){
            console.log('componentWillReceiveProps')
            this.auth();
        }
    }
    auth(){
        setTimeout(()=>{
            this.setState({isAuthed:true})
        },2000)
    }
}
export default TestAuth;